from fastapi import APIRouter
from app.controller.bonuses_controller import BonusesController

router = APIRouter(prefix="/rider/bonuses", tags=["Bonuses"])

@router.get("")
def get_bonuses():
    return BonusesController.get_bonuses()
