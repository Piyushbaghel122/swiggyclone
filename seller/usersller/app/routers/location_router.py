from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.location_schemas import (
    LocationCreate, LocationResponse, LocationSearchResponse, DistanceResponse
)
from app.controller.location_Controller import (
    get_user_locations, save_location, set_default_location, delete_location
)
from app.services.location_service import location_service
from typing import List

# Assuming a dependency to get current user ID like we did for KYC
# We will duplicate a simple version here or import if there is a central one.
# For now, we will assume a generic get_current_user_id exists or we'll define a quick dummy for structure
from fastapi import Request
import jwt
from os import getenv

def get_current_user_id(request: Request) -> int:
    token = request.cookies.get("token") or request.headers.get("Authorization")
    if token and token.startswith("Bearer "):
        token = token.replace("Bearer ", "").strip()
    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        jwt_secret = getenv("JWT_SECRET", "secret_key")
        payload = jwt.decode(token, jwt_secret, algorithms=["HS256"])
        return payload.get("user_id")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

router = APIRouter(
    prefix="/api/location",
    tags=["Location Service"]
)

@router.get("/search", response_model=LocationSearchResponse)
async def search_location_api(q: str = Query(..., min_length=2)):
    suggestions = await location_service.search_location(q)
    return {"success": True, "suggestions": suggestions}

@router.get("/reverse")
async def reverse_geocode_api(lat: float, lng: float):
    result = await location_service.reverse_geocode(lat, lng)
    return {"success": True, "data": result}

@router.get("/distance", response_model=DistanceResponse)
async def calculate_distance_api(origin_lat: float, origin_lng: float, dest_lat: float, dest_lng: float):
    result = await location_service.calculate_distance_eta(origin_lat, origin_lng, dest_lat, dest_lng)
    return result

@router.post("/save", response_model=LocationResponse)
def save_location_api(
    location: LocationCreate,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    return save_location(db, location, user_id)

@router.get("/list", response_model=List[LocationResponse])
def list_locations_api(
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    return get_user_locations(db, user_id)

@router.put("/default/{location_id}", response_model=LocationResponse)
def set_default_location_api(
    location_id: int,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    return set_default_location(db, location_id, user_id)

@router.delete("/{location_id}")
def delete_location_api(
    location_id: int,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    return delete_location(db, location_id, user_id)
