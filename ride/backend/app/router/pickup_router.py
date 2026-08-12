from fastapi import APIRouter
from app.controller.pickup_controller import PickupController

router = APIRouter(prefix="/rider/pickup", tags=["Pickup"])

@router.post("/start")
def start_pickup():
    return PickupController.start_pickup()

@router.post("/arrived")
def arrived_pickup():
    return PickupController.arrived_pickup()

@router.post("/confirm")
def confirm_pickup():
    return PickupController.confirm_pickup()

@router.post("/complete")
def complete_pickup():
    return PickupController.complete_pickup()

@router.get("/history")
def pickup_history():
    return PickupController.pickup_history()
