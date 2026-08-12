from fastapi import APIRouter
from app.controller.payout_controller import PayoutController

router = APIRouter(prefix="/rider/payout", tags=["Payout"])

@router.post("/request")
def request_payout():
    return PayoutController.request_payout()

@router.get("/history")
def payout_history():
    return PayoutController.payout_history()

@router.get("/status/{id}")
def payout_status():
    return PayoutController.payout_status()

@router.put("/bank-account")
def update_bank_account():
    return PayoutController.update_bank_account()

@router.delete("/request/{id}")
def cancel_payout_request():
    return PayoutController.cancel_payout_request()
