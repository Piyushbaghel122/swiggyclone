from fastapi import APIRouter
from app.controller.navigation_controller import NavigationController

router = APIRouter(prefix="/rider/navigation", tags=["Navigation"])

@router.get("/route")
def get_route():
    return NavigationController.get_route()

@router.get("/eta")
def get_eta():
    return NavigationController.get_eta()

@router.get("/directions")
def get_directions():
    return NavigationController.get_directions()

@router.post("/recalculate")
def recalculate_route():
    return NavigationController.recalculate_route()
