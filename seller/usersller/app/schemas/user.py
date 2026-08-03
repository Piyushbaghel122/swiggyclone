from fastapi import HTTPException, Depends
from pydantic import BaseModel
from datetime import datetime

class UserSchema(BaseModel): 
      user_id: int 
      user_name: str
      email: str 
      password: str 
      created_at: datetime 
      updated_at: datetime

class sendOtp(BaseModel):
      mobile_number: str

class verfiyOtp(BaseModel):
      mobile_number: str
      otp: str

class sendMessage(BaseModel):
      mobile_number: str
      message: str

class UserInfoSchema(BaseModel):
    user_id: int
    owername: str
    location: str
    pincode: str
    address: str
    mobile_number: str

class Workweekschudle(BaseModel):
    user_id: int
    monday: bool
    tuesday: bool
    wednesday: bool
    thursday: bool
    friday: bool
    saturday: bool
    sunday: bool

class restaurantName(BaseModel):
    name: str