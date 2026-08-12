"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MapPin, Navigation, User, FileText } from "lucide-react";

const api = axios.create({
    baseURL: "http://localhost:8002/v1/auth",
    headers:{
        "Content-Type": "application/json"
    },
    withCredentials: true
});

export const ProfileUser = () => {
    // Basic Profile State
    const [profileData, setProfileData] = useState(null);
    const [documentData, setDocumentData] = useState(null);

    // Location Tracking State
    const [location, setLocation] = useState<{latitude: number; longitude: number} | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isTracking, setIsTracking] = useState(false);
    
    const wsRef = useRef<WebSocket | null>(null);
    const watchIdRef = useRef<number | null>(null);
    const userId = 1; // Assuming a mock userId or getting it from context

    const getProfile = async () => {
        try {
            const response = await api.get("/getme");
            setProfileData(response.data);
        } catch (err) {
            console.error("Failed to fetch profile", err);
        }
    }

    const getDocument = async () => {
        try {
            const response = await api.get("/documentgetme");
            setDocumentData(response.data);
        } catch (err) {
            console.error("Failed to fetch document", err);
        }
    }

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
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">User Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Profile Info Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                            <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Details</h2>
                    </div>
                    <div className="space-y-4">
                        <button 
                            onClick={getProfile}
                            className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-colors border border-gray-200 dark:border-gray-600"
                        >
                            Load Profile Data
                        </button>
                        {profileData && (
                            <pre className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm text-gray-600 dark:text-gray-400 overflow-x-auto border border-gray-200 dark:border-gray-800">
                                {JSON.stringify(profileData, null, 2)}
                            </pre>
                        )}
                    </div>
                </div>

                {/* Document Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                            <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Documents</h2>
                    </div>
                    <div className="space-y-4">
                        <button 
                            onClick={getDocument}
                            className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-colors border border-gray-200 dark:border-gray-600"
                        >
                            Load Documents
                        </button>
                        {documentData && (
                            <pre className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm text-gray-600 dark:text-gray-400 overflow-x-auto border border-gray-200 dark:border-gray-800">
                                {JSON.stringify(documentData, null, 2)}
                            </pre>
                        )}
                    </div>
                </div>
            </div>

            {/* Live Location Tracking Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mt-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${isTracking ? 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 animate-pulse' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                            <Navigation className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Live Location</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Share real-time position</p>
                        </div>
                    </div>
                    
                    <button
                        onClick={isTracking ? stopTracking : startTracking}
                        className={`px-6 py-2.5 rounded-lg font-medium text-white transition-all shadow-sm ${
                            isTracking 
                                ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' 
                                : 'bg-green-600 hover:bg-green-700 shadow-green-600/20'
                        }`}
                    >
                        {isTracking ? 'Stop Sharing' : 'Start Sharing'}
                    </button>
                </div>

                {error && (
                    <div className="mb-6 p-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/50">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                            <MapPin className="w-4 h-4" /> 
                            <span className="text-sm font-medium">Latitude</span>
                        </div>
                        <div className="text-lg font-mono font-semibold text-gray-900 dark:text-white">
                            {location?.latitude?.toFixed(6) || '---.------'}
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                            <MapPin className="w-4 h-4" /> 
                            <span className="text-sm font-medium">Longitude</span>
                        </div>
                        <div className="text-lg font-mono font-semibold text-gray-900 dark:text-white">
                            {location?.longitude?.toFixed(6) || '---.------'}
                        </div>
                    </div>
                </div>

                {/* Google Maps Embed */}
                {location && (
                    <div className="mt-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 h-[300px] w-full bg-gray-100 dark:bg-gray-900">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
                        ></iframe>
                    </div>
                )}
            </div>

        </div>
    );
};