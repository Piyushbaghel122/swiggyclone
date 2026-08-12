from fastapi import APIRouter
from app.controller.notifications_controller import NotificationsController

router = APIRouter(prefix="/rider/notifications", tags=["Notifications"])

@router.get("")
def get_notifications():
    return NotificationsController.get_notifications()

@router.put("/read/{id}")
def read_notification():
    return NotificationsController.read_notification()

@router.put("/read-all")
def read_all_notifications():
    return NotificationsController.read_all_notifications()

@router.delete("/{id}")
def delete_notification():
    return NotificationsController.delete_notification()
