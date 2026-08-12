from fastapi import APIRouter
from app.controller.wallet_controller import WalletController

router = APIRouter(prefix="/rider/wallet", tags=["Wallet"])

@router.get("")
def get_wallet():
    return WalletController.get_wallet()

@router.get("/history")
def wallet_history():
    return WalletController.wallet_history()

@router.post("/withdraw")
def wallet_withdraw():
    return WalletController.wallet_withdraw()

@router.post("/transfer")
def wallet_transfer():
    return WalletController.wallet_transfer()

@router.get("/transactions")
def wallet_transactions():
    return WalletController.wallet_transactions()
