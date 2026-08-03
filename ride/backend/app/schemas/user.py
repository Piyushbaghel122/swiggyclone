from pydantic import BaseModel , EmailStr
from typing import Optional
from datetime import datetime

class UserSchema(BaseModel): 
    id: Optional[str] = None
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    mobile: int
    created_At: Optional[datetime] = None
    updated_At: Optional[datetime] = None

