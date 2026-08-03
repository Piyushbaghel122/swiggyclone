from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class LocationBase(BaseModel):
    label: Optional[str] = Field(None, description="E.g., Home, Work, Other")
    address: str
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    postal_code: Optional[str] = None
    latitude: float
    longitude: float
    place_id: Optional[str] = None
    is_default: Optional[bool] = False

class LocationCreate(LocationBase):
    pass

class LocationUpdate(LocationBase):
    address: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class LocationResponse(LocationBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        orm_mode = True
        from_attributes = True

class SearchSuggestion(BaseModel):
    place_id: str
    description: str

class LocationSearchResponse(BaseModel):
    success: bool
    suggestions: List[SearchSuggestion]

class DistanceRequest(BaseModel):
    origin_lat: float
    origin_lng: float
    dest_lat: float
    dest_lng: float

class DistanceResponse(BaseModel):
    success: bool
    distance_km: float
    eta_minutes: int


class RestaurantLocationCreate(BaseModel):
    restaurant_id: str 
    address:str 
    city: str 
    state: str 
    country: str 
    postal_code: str 
    latitude: float 
    longitude: float 
    delivery_radius: float 

