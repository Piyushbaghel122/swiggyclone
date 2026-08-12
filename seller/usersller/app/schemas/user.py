from fastapi import HTTPException, Depends
from pydantic import BaseModel
from datetime import datetime

from typing import Optional

class UserSchema(BaseModel): 
      user_id: Optional[int] = None
      user_name: Optional[str] = None
      email: Optional[str] = None
      mobile_number: Optional[str] = None
      password: str 
      confirm_password: str
      countryCode: Optional[str] = None
      state: Optional[str] = None
      created_at: Optional[datetime] = None
      updated_at: Optional[datetime] = None

