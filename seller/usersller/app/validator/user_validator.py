from pydantic import BaseModel, Field, field_validator
from typing import Optional

class RegisterValidator(BaseModel):
    user_name: str = Field(
        ...,
        min_length=3,
        max_length=30,
        pattern=r"^[a-zA-Z0-9_ ]+$",
        description="Username must be between 3 and 30 characters and can only contain letters, numbers, underscores, and spaces"
    )
    email: str = Field(
        ...,
        pattern=r"^[\w\.-]+@[\w\.-]+\.\w+$",
        description="Please provide a valid email"
    )
    password: str = Field(
        ...,
        min_length=6,
        description="Password must be at least 6 characters"
    )
    confirm_password: str
    countryCode: Optional[str] = None
    mobile_number: Optional[str] = None

    @field_validator('confirm_password')
    def passwords_match(cls, v, info):
        if 'password' in info.data and v != info.data['password']:
            raise ValueError('Passwords do not match')
        return v

class LoginValidator(BaseModel):
    email: str = Field(
        ...,
        pattern=r"^[\w\.-]+@[\w\.-]+\.\w+$",
        description="Please provide a valid email"
    )
    password: str = Field(..., min_length=1)

class VerifyOTPValidator(BaseModel):
    mobile_number: str
    otp: str

class ResendOTPValidator(BaseModel):
    mobile_number: str
