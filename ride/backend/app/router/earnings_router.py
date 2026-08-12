from fastapi import APIRouter
from app.controller.earnings_controller import EarningsController

router = APIRouter(prefix="/rider/earnings", tags=["Earnings"])

@router.get("")
def get_earnings():
    return EarningsController.get_earnings()

@router.get("/today")
def today_earnings():
    return EarningsController.today_earnings()

@router.get("/week")
def week_earnings():
    return EarningsController.week_earnings()

@router.get("/month")
def month_earnings():
    return EarningsController.month_earnings()

@router.get("/history")
def earnings_history():
    return EarningsController.earnings_history()

@router.get("/summary")
def earnings_summary():
    return EarningsController.earnings_summary()

@router.get("/{earningId}")
def get_earning_by_id():
    return EarningsController.get_earning_by_id()
