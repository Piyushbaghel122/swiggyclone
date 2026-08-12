from fastapi import APIRouter
from app.controller.support_controller import SupportController

router = APIRouter(prefix="/rider/support", tags=["Support"])

@router.post("/ticket")
def create_ticket():
    return SupportController.create_ticket()

@router.get("/tickets")
def get_tickets():
    return SupportController.get_tickets()

@router.get("/ticket/{id}")
def get_ticket_by_id():
    return SupportController.get_ticket_by_id()

@router.post("/chat")
def support_chat():
    return SupportController.support_chat()
