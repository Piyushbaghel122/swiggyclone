"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { locationService } from "../../../lib/services/locationService";

// Fix for default Leaflet icon issue in Next.js
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface InteractiveMapProps {
  initialLat?: number;
  initialLng?: number;
  onLocationChange: (lat: number, lng: number, address: string) => void;
}

function LocationMarker({ position, setPosition, onLocationChange }: any) {
  const markerRef = useRef<L.Marker>(null);

  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      updateLocation(lat, lng);
    },
    dragend() {
      const center = map.getCenter();
      setPosition(center);
      updateLocation(center.lat, center.lng);
    }
  });

  const updateLocation = async (lat: number, lng: number) => {
    const result = await locationService.reverseGeocode(lat, lng);
    if (result) {
      onLocationChange(lat, lng, result.address || "Selected Location");
    } else {
      onLocationChange(lat, lng, "Unknown Location");
    }
  };

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          setPosition(marker.getLatLng());
          updateLocation(lat, lng);
        }
      },
    }),
    []
  );

  return position === null ? null : (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={defaultIcon}
    />
  );
}

function ChangeView({ center, zoom, shouldFly }: { center: [number, number]; zoom: number; shouldFly: boolean }) {
  const map = useMap();
  useEffect(() => {
    if (shouldFly) {
      map.flyTo(center, zoom, { duration: 1.5 });
    }
  }, [center, zoom, map, shouldFly]);
  return null;
}

export default function InteractiveMap({
  initialLat = 28.6139,
  initialLng = 77.2090, // Default to New Delhi
  onLocationChange,
}: InteractiveMapProps) {
  const [position, setPosition] = useState<L.LatLng>(new L.LatLng(initialLat, initialLng));
  const [shouldFly, setShouldFly] = useState(true);

  useEffect(() => {
    const newPos = new L.LatLng(initialLat, initialLng);
    // If the new props are different from the current marker position, it means the 
    // change came from outside (like a search bar), so we should fly to it.
    // If they are the same, the change came from a click/drag, so we shouldn't fly.
    if (position.lat !== initialLat || position.lng !== initialLng) {
      setPosition(newPos);
      setShouldFly(true);
    } else {
      setShouldFly(false);
    }
  }, [initialLat, initialLng]); // only depend on props

  // Reset shouldFly after it flies once
  useEffect(() => {
    if (shouldFly) {
      const timer = setTimeout(() => setShouldFly(false), 500);
      return () => clearTimeout(timer);
    }
  }, [shouldFly]);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border-2 border-gray-300">
      <MapContainer
        center={[initialLat, initialLng]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <ChangeView center={[position.lat, position.lng]} zoom={13} shouldFly={shouldFly} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} onLocationChange={onLocationChange} />
      </MapContainer>
    </div>
  );
}
