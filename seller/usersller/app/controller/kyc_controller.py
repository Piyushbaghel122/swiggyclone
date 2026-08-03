from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.kyc_model import KycDB, KycStatusEnum
from app.schemas.kyc_schema import (
    PanVerifyRequest, PanVerifyResponse,
    AadhaarOtpRequest, AadhaarOtpResponse,
    AadhaarVerifyRequest, AadhaarVerifyResponse,
    CkycSearchRequest, CkycSearchResponse,
    BankVerifyRequest, BankVerifyResponse,
    KycStatusResponse
)
from app.services.karza_service import karza_service

def _get_or_create_kyc(db: Session, user_id: int) -> KycDB:
    kyc_record = db.query(KycDB).filter(KycDB.user_id == user_id).first()
    if not kyc_record:
        kyc_record = KycDB(user_id=user_id)
        db.add(kyc_record)
        db.commit()
        db.refresh(kyc_record)
    return kyc_record

def _update_overall_status(kyc_record: KycDB):
    if kyc_record.pan_verified and kyc_record.aadhaar_verified and kyc_record.bank_verified:
        kyc_record.status = KycStatusEnum.APPROVED
    else:
        kyc_record.status = KycStatusEnum.PENDING

async def verify_pan_controller(request: PanVerifyRequest, user_id: int, db: Session) -> PanVerifyResponse:
    kyc_record = _get_or_create_kyc(db, user_id)
    
    if kyc_record.pan_verified:
        return PanVerifyResponse(success=True, message="PAN is already verified.", pan_holder_name=kyc_record.pan_holder_name)

    service_response = await karza_service.verify_pan(request.pan_number)
    
    if service_response["success"]:
        kyc_record.pan_number = request.pan_number
        kyc_record.pan_verified = True
        kyc_record.pan_holder_name = service_response.get("pan_holder_name")
        _update_overall_status(kyc_record)
        
        db.commit()
        
    return PanVerifyResponse(
        success=service_response["success"],
        message=service_response["message"],
        pan_holder_name=service_response.get("pan_holder_name")
    )

async def generate_aadhaar_otp_controller(request: AadhaarOtpRequest, user_id: int, db: Session) -> AadhaarOtpResponse:
    # Just initiate the OTP generation
    service_response = await karza_service.generate_aadhaar_otp(request.aadhaar_number)
    
    # Store the aadhaar number temporarily or just rely on verify step
    if service_response["success"]:
        kyc_record = _get_or_create_kyc(db, user_id)
        kyc_record.aadhaar_number = request.aadhaar_number
        db.commit()
        
    return AadhaarOtpResponse(
        success=service_response["success"],
        message=service_response["message"],
        reference_id=service_response.get("reference_id")
    )

async def verify_aadhaar_otp_controller(request: AadhaarVerifyRequest, user_id: int, db: Session) -> AadhaarVerifyResponse:
    kyc_record = _get_or_create_kyc(db, user_id)
    
    if kyc_record.aadhaar_verified:
        return AadhaarVerifyResponse(success=True, message="Aadhaar is already verified.")

    service_response = await karza_service.verify_aadhaar_otp(request.reference_id, request.otp)
    
    if service_response["success"]:
        kyc_record.aadhaar_verified = True
        _update_overall_status(kyc_record)
        db.commit()
        
    return AadhaarVerifyResponse(
        success=service_response["success"],
        message=service_response["message"]
    )

async def search_ckyc_controller(request: CkycSearchRequest, user_id: int, db: Session) -> CkycSearchResponse:
    kyc_record = _get_or_create_kyc(db, user_id)
    
    if kyc_record.ckyc_verified:
        return CkycSearchResponse(success=True, message="CKYC already fetched.", ckyc_number=kyc_record.ckyc_number)

    service_response = await karza_service.karza_ckyc_search(request.id_type, request.id_value)
    
    if service_response["success"]:
        kyc_record.ckyc_number = service_response.get("ckyc_number")
        kyc_record.ckyc_verified = True
        db.commit()
        
    return CkycSearchResponse(
        success=service_response["success"],
        message=service_response["message"],
        ckyc_number=service_response.get("ckyc_number")
    )

async def verify_bank_controller(request: BankVerifyRequest, user_id: int, db: Session) -> BankVerifyResponse:
    kyc_record = _get_or_create_kyc(db, user_id)
    
    if kyc_record.bank_verified:
        return BankVerifyResponse(success=True, message="Bank already verified.", bank_holder_name=kyc_record.bank_holder_name)

    service_response = await karza_service.karza_bank_penny_drop(request.account_number, request.ifsc)
    
    if service_response["success"]:
        kyc_record.bank_account_number = request.account_number
        kyc_record.ifsc_code = request.ifsc
        kyc_record.bank_verified = True
        kyc_record.bank_holder_name = service_response.get("bank_holder_name")
        _update_overall_status(kyc_record)
        db.commit()
        
    return BankVerifyResponse(
        success=service_response["success"],
        message=service_response["message"],
        bank_holder_name=service_response.get("bank_holder_name")
    )

def get_kyc_status_controller(user_id: int, db: Session) -> KycStatusResponse:
    kyc_record = _get_or_create_kyc(db, user_id)
    return KycStatusResponse(
        user_id=kyc_record.user_id,
        pan_verified=kyc_record.pan_verified,
        aadhaar_verified=kyc_record.aadhaar_verified,
        ckyc_verified=kyc_record.ckyc_verified,
        bank_verified=kyc_record.bank_verified,
        status=kyc_record.status,
        pan_holder_name=kyc_record.pan_holder_name,
        bank_holder_name=kyc_record.bank_holder_name
    )
