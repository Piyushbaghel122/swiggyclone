from fastapi import APIRouter
from app.controller.kyc_controller import KycController

router = APIRouter(prefix="/rider/kyc", tags=["Kyc"])

@router.post("/upload")
def upload_kyc():
    return KycController.upload_kyc()

@router.get("/status")
def kyc_status():
    return KycController.kyc_status()

@router.put("/update")
def update_kyc():
    return KycController.update_kyc()
