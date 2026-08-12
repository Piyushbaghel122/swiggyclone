from fastapi import APIRouter
from app.controller.analytics_controller import AnalyticsController

router = APIRouter(prefix="/rider/analytics", tags=["Analytics"])

@router.get("/dashboard")
def analytics_dashboard():
    return AnalyticsController.analytics_dashboard()
    

@router.get("/orders")
def analytics_orders():
    return AnalyticsController.analytics_orders()

@router.get("/earnings")
def analytics_earnings():
    return AnalyticsController.analytics_earnings()

@router.get("/performance")
def analytics_performance():
    return AnalyticsController.analytics_performance()

@router.get("/ratings")
def analytics_ratings():
    return AnalyticsController.analytics_ratings()
