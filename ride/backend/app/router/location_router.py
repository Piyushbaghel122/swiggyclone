from fastapi import APIRouter
from app.controller.location_controller import LocationController

router = APIRouter(prefix="/rider/location", tags=["Location"])

@router.post("/update")
def update_location():
    return LocationController.update_location()

@router.get("/current")
def current_location():
    return LocationController.current_location()

@router.get("/history")
def location_history():
    return LocationController.location_history()

@router.get("/{riderId}")
def get_rider_location():
    return LocationController.get_rider_location()

@router.post("/share")
def share_location():
    return LocationController.share_location()

@router.delete("/share")
def stop_share_location():
    return LocationController.stop_share_location()
