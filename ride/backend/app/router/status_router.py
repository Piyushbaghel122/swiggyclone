from fastapi import APIRouter
from app.controller.status_controller import StatusController

router = APIRouter(prefix="/rider/status", tags=["Status"])

@router.post("/online")
def set_online():
    return StatusController.set_online()

@router.post("/offline")
def set_offline():
    return StatusController.set_offline()

@router.get("")
def get_status():
    return StatusController.get_status()

@router.put("")
def update_status():
    return StatusController.update_status()
