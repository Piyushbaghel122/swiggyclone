from fastapi import APIRouter
from app.controller.incentives_controller import IncentivesController

router = APIRouter(prefix="/rider/incentives", tags=["Incentives"])

@router.get("")
def get_incentives():
    return IncentivesController.get_incentives()

@router.get("/history")
def incentives_history():
    return IncentivesController.incentives_history()
