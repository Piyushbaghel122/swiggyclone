from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
import jwt
from os import getenv
from app.schemas.kyc_schema import (
    PanVerifyRequest, PanVerifyResponse,
    AadhaarOtpRequest, AadhaarOtpResponse,
    AadhaarVerifyRequest, AadhaarVerifyResponse,
    CkycSearchRequest, CkycSearchResponse,
    BankVerifyRequest, BankVerifyResponse,
    KycStatusResponse
)
from app.controller.kyc_controller import (
    verify_pan_controller,
    generate_aadhaar_otp_controller,
    verify_aadhaar_otp_controller,
    search_ckyc_controller,
    verify_bank_controller,
    get_kyc_status_controller
)

router = APIRouter(
    prefix="/kyc",
    tags=["KYC (Know Your Customer)"]
)

def get_current_user_id(request: Request) -> int:
    token = request.cookies.get("token") or request.headers.get("Authorization")
    if token and token.startswith("Bearer "):
        token = token.replace("Bearer ", "").strip()
    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        jwt_secret = getenv("JWT_SECRET", "secret_key")
        payload = jwt.decode(token, jwt_secret, algorithms=["HS256"])
        user_id = payload.get("user_id")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

@router.post("/pan/verify", response_model=PanVerifyResponse)
async def verify_pan(
    request: PanVerifyRequest,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    return await verify_pan_controller(request, user_id, db)

@router.post("/aadhaar/generate-otp", response_model=AadhaarOtpResponse)
async def generate_aadhaar_otp(
    request: AadhaarOtpRequest,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    return await generate_aadhaar_otp_controller(request, user_id, db)

@router.post("/aadhaar/verify-otp", response_model=AadhaarVerifyResponse)
async def verify_aadhaar_otp(
    request: AadhaarVerifyRequest,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    return await verify_aadhaar_otp_controller(request, user_id, db)

@router.post("/ckyc/search", response_model=CkycSearchResponse)
async def search_ckyc(
    request: CkycSearchRequest,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    return await search_ckyc_controller(request, user_id, db)

@router.post("/bank/verify", response_model=BankVerifyResponse)
async def verify_bank(
    request: BankVerifyRequest,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    return await verify_bank_controller(request, user_id, db)

@router.get("/status", response_model=KycStatusResponse)
def get_kyc_status(
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    return get_kyc_status_controller(user_id, db)
