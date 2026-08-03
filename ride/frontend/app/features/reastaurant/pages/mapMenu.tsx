"use client";

import { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.2090,
};

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

export default function MapMenu() {
  // Setup Google Maps loader
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "", // Empty string triggers development mode (shows watermark but no crash)
  });

  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  useEffect(() => {
    // Simulate real-time movement
    const interval = setInterval(() => {
      setMarkerPosition((prev) => ({
        lat: prev.lat + 0.0001,
        lng: prev.lng + 0.0001,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 font-medium">Loading Google Maps...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-sm border border-gray-200 relative">
      <style>
        {`
          /* Hide Google Logo and Terms of Service (For Demo Purposes) */
          .gmnoprint a, .gmnoprint span, .gm-style-cc {
              display: none !important;
          }
          a[href^="https://maps.google.com/maps"] {
              display: none !important;
          }
          /* Hide the 'This page can't load Google Maps correctly' dialog */
          .gm-err-container {
              display: none !important;
          }
        `}
      </style>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={17}
        options={{
          tilt: 60, // 3D perspective
          heading: 20,
          disableDefaultUI: false,
          styles: darkMapStyle, // Apply the dark navigation theme
        }}
      >
        {/* Real-time moving marker */}
        <Marker position={markerPosition} />
      </GoogleMap>
    </div>
  );
}
