"use client";

import React, { useState, useEffect } from "react";
import { locationService, Suggestion } from "../../../lib/services/locationService";

interface LocationSearchProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
}

export default function LocationSearch({ onLocationSelect }: LocationSearchProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length >= 3) {
        setLoading(true);
        const results = await locationService.getSuggestions(query);
        setSuggestions(results);
        setLoading(false);
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelect = async (suggestion: Suggestion) => {
    setQuery(suggestion.description);
    setSuggestions([]);
    onLocationSelect(suggestion.lat, suggestion.lon, suggestion.description);
  };

  const handleDetectLocation = () => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const result = await locationService.reverseGeocode(lat, lng);
          if (result) {
            setQuery(result.address || "Current Location");
            onLocationSelect(lat, lng, result.address || "Current Location");
          }
          setLoading(false);
        },
        (error) => {
          console.error("Error detecting location:", error);
          alert("Could not detect location. Please search manually.");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search for area, street name..."
          className="w-full border-2 border-gray-300 rounded-lg p-3"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleDetectLocation}
          className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg flex items-center justify-center min-w-[120px]"
          disabled={loading}
        >
          {loading ? "Detecting..." : "Locate Me"}
        </button>
      </div>
      
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
