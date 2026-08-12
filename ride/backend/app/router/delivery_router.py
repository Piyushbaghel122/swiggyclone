from fastapi import APIRouter
from app.controller.delivery_controller import DeliveryController

router = APIRouter(prefix="/rider/delivery", tags=["Delivery"])

@router.post("/start")
def start_delivery():
    return DeliveryController.start_delivery()

@router.post("/arrived")
def arrived_delivery():
    return DeliveryController.arrived_delivery()

@router.post("/complete")
def complete_delivery():
    return DeliveryController.complete_delivery()

@router.post("/cancel")
def cancel_delivery():
    return DeliveryController.cancel_delivery()

@router.get("/current")
def current_delivery():
    return DeliveryController.current_delivery()

@router.get("/history")
def delivery_history():
    return DeliveryController.delivery_history()

@router.put("/status")
def update_delivery_status():
    return DeliveryController.update_delivery_status()
