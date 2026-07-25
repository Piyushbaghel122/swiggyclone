from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserSchema(BaseModel):
    id: str
    username: str
    email: str
    password: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

class UserProfile(BaseModel): 
    id: str
    username: str
    lastname: str 
    email: str
    phone_number: int
    avatar: Optional[str] = None
    memberSince: datetime
    subscription: str 
    created_at: Optional[datetime] = None 
    updated_at: Optional[datetime] = None

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True
