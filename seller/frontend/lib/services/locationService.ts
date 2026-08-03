export interface Location {
  id?: number;
  user_id?: number;
  label?: string;
  address: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  latitude: number;
  longitude: number;
  place_id?: string;
  is_default?: boolean;
}

export interface Suggestion {
  place_id: string;
  description: string;
  lat: number;
  lon: number;
}

const API_BASE_URL = "http://localhost:8002/api/location";

export const locationService = {
  /**
   * Search for location suggestions
   */
  search: async (query: string): Promise<Suggestion[]> => {
    if (query.length < 3) return [];
    try {
      const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (data.success) {
        return data.suggestions;
      }
      return [];
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      return [];
    }
  },

  /**
   * Get location suggestions
   */
  getSuggestions: async (query: string): Promise<Suggestion[]> => {
    if (query.length < 3) return [];
    try {
      const response = await fetch(`${API_BASE_URL}/suggestions?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (data.success) {
        return data.suggestions;
      }
      return [];
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      return [];
    }
  },

  /**
   * Get nearby locations
   */
  getNearby: async (lat: number, lng: number): Promise<Location[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/nearby?lat=${lat}&lng=${lng}`);
      const data = await response.json();
      if (data.success) {
        return data.locations || [];
      }
      return [];
    } catch (error) {
      console.error("Error fetching nearby locations:", error);
      return [];
    }
  },

  /**
   * Reverse geocode a latitude and longitude
   */
  reverseGeocode: async (lat: number, lng: number): Promise<any> => {
    try {
      const response = await fetch(`${API_BASE_URL}/reverse?lat=${lat}&lng=${lng}`);
      const data = await response.json();
      return data.success ? data.data : null;
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      return null;
    }
  },

  /**
   * Calculate distance and ETA between two points
   */
  getDistanceAndEta: async (originLat: number, originLng: number, destLat: number, destLng: number) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/distance?origin_lat=${originLat}&origin_lng=${originLng}&dest_lat=${destLat}&dest_lng=${destLng}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error calculating distance:", error);
      return null;
    }
  },

  /**
   * Get ETA between two points
   */
  getEta: async (originLat: number, originLng: number, destLat: number, destLng: number) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/eta?origin_lat=${originLat}&origin_lng=${originLng}&dest_lat=${destLat}&dest_lng=${destLng}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error calculating ETA:", error);
      return null;
    }
  },

  /**
   * Get all saved locations for the user
   */
  getSavedLocations: async (token: string): Promise<Location[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/list`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error("Error fetching saved locations:", error);
      return [];
    }
  },

  /**
   * Save a new location
   */
  saveLocation: async (location: Location, token: string): Promise<Location | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(location)
      });
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error("Error saving location:", error);
      return null;
    }
  },

  /**
   * Set a location as default
   */
  setDefaultLocation: async (locationId: number, token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/default/${locationId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.ok;
    } catch (error) {
      console.error("Error setting default location:", error);
      return false;
    }
  },

  /**
   * Delete a location
   */
  deleteLocation: async (locationId: number, token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${locationId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.ok;
    } catch (error) {
      console.error("Error deleting location:", error);
      return false;
    }
  }
};
