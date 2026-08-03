from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum

class KycStatusEnum(str, Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"

class PanVerifyRequest(BaseModel):
    pan_number: str = Field(..., min_length=10, max_length=10, description="10 character PAN string")

class PanVerifyResponse(BaseModel):
    success: bool
    message: str
    pan_holder_name: Optional[str] = None
    
class AadhaarOtpRequest(BaseModel):
    aadhaar_number: str = Field(..., min_length=12, max_length=12, description="12 digit Aadhaar number")

class AadhaarOtpResponse(BaseModel):
    success: bool
    message: str
    reference_id: Optional[str] = None

class AadhaarVerifyRequest(BaseModel):
    reference_id: str = Field(..., description="Reference ID received from OTP request")
    otp: str = Field(..., min_length=6, max_length=6, description="6 digit OTP")

class AadhaarVerifyResponse(BaseModel):
    success: bool
    message: str

class CkycSearchRequest(BaseModel):
    id_type: str = Field(..., description="PAN or AADHAAR")
    id_value: str = Field(..., description="The value of the ID")

class CkycSearchResponse(BaseModel):
    success: bool
    message: str
    ckyc_number: Optional[str] = None
    
class BankVerifyRequest(BaseModel):
    account_number: str = Field(..., description="Bank Account Number")
    ifsc: str = Field(..., description="Bank IFSC Code")

class BankVerifyResponse(BaseModel):
    success: bool
    message: str
    bank_holder_name: Optional[str] = None

class KycStatusResponse(BaseModel):
    user_id: int
    pan_verified: bool
    aadhaar_verified: bool
    ckyc_verified: bool
    bank_verified: bool
    status: KycStatusEnum
    pan_holder_name: Optional[str] = None
    bank_holder_name: Optional[str] = None
