"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MapPin, Navigation } from "lucide-react";

const api = axios.create({
    baseURL: "http://localhost:8002/v1/driver",
    headers:{
        "Content-Type": "application/json"
    }, 
    withCredentials: true
});

export default function RidePage() {
    const [location, setLocation] = useState<{latitude: number; longitude: number} | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isTracking, setIsTracking] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);
    const watchIdRef = useRef<number | null>(null);

    const userId = 1; // Replace with actual user ID from your auth system or context

    const startTracking = () => {
        if (!("geolocation" in navigator)) {
            setError("Geolocation is not supported by your browser");
            return;
        }

        // Connect to WebSocket
        const wsUrl = `ws://localhost:8002/api/v1/ws/location/${userId}`;
        wsRef.current = new WebSocket(wsUrl);

        wsRef.current.onopen = () => {
            console.log("WebSocket connected for location tracking");
            setIsTracking(true);
            setError(null);
        };

        wsRef.current.onerror = (err) => {
            console.error("WebSocket error", err);
            setError("Failed to connect to location server");
            setIsTracking(false);
        };

        wsRef.current.onclose = () => {
            console.log("WebSocket disconnected");
            setIsTracking(false);
        };

        // Start watching position
        watchIdRef.current = navigator.geolocation.watchPosition(
            (position) => {
                const newLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    heading: position.coords.heading,
                    speed: position.coords.speed,
                };
                
                setLocation({ latitude: newLocation.latitude, longitude: newLocation.longitude });

                // Send to backend via WebSocket
                if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                    wsRef.current.send(JSON.stringify({
                        type: "location:update",
                        ...newLocation
                    }));
                }
            },
            (err) => {
                setError(err.message);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 10000,
                timeout: 5000
            }
        );
    };

    const stopTracking = () => {
        if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }
        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }
        setIsTracking(false);
    };

    // Clean up on unmount
    useEffect(() => {
        return () => {
            stopTracking();
        };
    }, []);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                <div className="flex flex-col items-center gap-4">
                    <div className={`p-4 rounded-full ${isTracking ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                        <Navigation className={`w-8 h-8 ${isTracking ? 'animate-pulse' : ''}`} />
                    </div>
                    
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Live Location Tracker</h1>
                    
                    {error && (
                        <div className="p-3 w-full text-sm text-red-600 bg-red-50 rounded-lg text-center">
                            {error}
                        </div>
                    )}

                    <div className="w-full bg-gray-50 dark:bg-gray-700 p-4 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Status</span>
                            <span className={`font-medium ${isTracking ? 'text-green-500' : 'text-gray-500'}`}>
                                {isTracking ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <MapPin className="w-4 h-4" /> Latitude
                            </span>
                            <span className="font-mono text-gray-900 dark:text-white">{location?.latitude?.toFixed(6) || '--'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <MapPin className="w-4 h-4" /> Longitude
                            </span>
                            <span className="font-mono text-gray-900 dark:text-white">{location?.longitude?.toFixed(6) || '--'}</span>
                        </div>
                    </div>

                    <button
                        onClick={isTracking ? stopTracking : startTracking}
                        className={`w-full py-3 rounded-xl font-semibold text-white transition-colors ${
                            isTracking 
                                ? 'bg-red-500 hover:bg-red-600' 
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {isTracking ? 'Stop Tracking' : 'Start Tracking'}
                    </button>
                </div>
            </div>
        </div>
    );
}