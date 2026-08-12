from fastapi import APIRouter
from app.controller.orders_controller import OrdersController

router = APIRouter(prefix="/rider/orders", tags=["Orders"])

@router.get("/available")
def get_available_orders():
    return OrdersController.get_available_orders()

@router.get("/{orderId}")
def get_order():
    return OrdersController.get_order()

@router.post("/{orderId}/assign")
def assign_order():
    return OrdersController.assign_order()

@router.post("/{orderId}/accept")
def accept_order():
    return OrdersController.accept_order()

@router.post("/{orderId}/reject")
def reject_order():
    return OrdersController.reject_order()

@router.post("/{orderId}/cancel")
def cancel_order():
    return OrdersController.cancel_order()

@router.get("/assigned")
def get_assigned_orders():
    return OrdersController.get_assigned_orders()

@router.get("/history")
def get_order_history():
    return OrdersController.get_order_history()

@router.get("/pending")
def get_pending_orders():
    return OrdersController.get_pending_orders()
