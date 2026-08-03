import httpx
import math

class LocationService:
    """
    Service for interacting with Location APIs.
    Currently using free OpenStreetMap (Nominatim & OSRM) APIs to avoid billing,
    but can be swapped with Google Maps API easily later.
    """
    
    NOMINATIM_URL = "https://nominatim.openstreetmap.org"
    OSRM_URL = "http://router.project-osrm.org"

    async def search_location(self, query: str) -> list:
        """Search for locations based on a text query (Autocomplete equivalent)."""
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f"{self.NOMINATIM_URL}/search",
                    params={"q": query, "format": "json", "limit": 5, "addressdetails": 1},
                    headers={"User-Agent": "FastAPI_Location_Service/1.0"}
                )
                if response.status_code == 200:
                    data = response.json()
                    suggestions = []
                    for item in data:
                        suggestions.append({
                            "place_id": str(item.get("place_id")),
                            "description": item.get("display_name"),
                            "lat": float(item.get("lat")),
                            "lon": float(item.get("lon"))
                        })
                    return suggestions
            except Exception as e:
                print(f"Error calling Nominatim: {e}")
        return []

    async def reverse_geocode(self, lat: float, lng: float) -> dict:
        """Get address details from coordinates."""
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f"{self.NOMINATIM_URL}/reverse",
                    params={"lat": lat, "lon": lng, "format": "json"},
                    headers={"User-Agent": "FastAPI_Location_Service/1.0"}
                )
                if response.status_code == 200:
                    return response.json()
            except Exception as e:
                print(f"Error reverse geocoding: {e}")
        return {}

    async def calculate_distance_eta(self, origin_lat: float, origin_lng: float, dest_lat: float, dest_lng: float) -> dict:
        """Calculate distance and ETA using OSRM."""
        # OSRM expects coordinates in lon,lat order
        coords = f"{origin_lng},{origin_lat};{dest_lng},{dest_lat}"
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f"{self.OSRM_URL}/route/v1/driving/{coords}",
                    params={"overview": "false"}
                )
                if response.status_code == 200:
                    data = response.json()
                    if data.get("code") == "Ok":
                        route = data["routes"][0]
                        distance_km = route["distance"] / 1000.0
                        eta_minutes = math.ceil(route["duration"] / 60.0)
                        return {
                            "success": True,
                            "distance_km": round(distance_km, 2),
                            "eta_minutes": eta_minutes
                        }
            except Exception as e:
                print(f"Error calculating distance: {e}")
                
        return {"success": False, "distance_km": 0, "eta_minutes": 0}

location_service = LocationService()
