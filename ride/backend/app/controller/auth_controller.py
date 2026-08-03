from fastapi import APIRouter, HTTPException, Body, Depends, Response
from sqlalchemy.orm import Session
import jwt
from os import getenv
from dotenv import load_dotenv
from typing import Annotated, Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from bcrypt import hashpw, gensalt
import uuid
from twilio.rest import Client 


load_dotenv()

account_sid= getenv("TWILIO_ACCOUNT_SID")
auth_token = getenv("TWILIO_AUTH_TOKEN")
verify_sid = getenv("TWILIO_VERIFY_SID")

client = Client(account_sid, auth_token)


from app.core.database import get_db
from app.modules.user import User
from app.schemas.user import UserSchema
from app.core.redis import redis_client



secret_key = getenv("JWT_SECRET")
algorithm = getenv("JWT_ALGORITHM")

def registerUser(data: UserSchema, db: Session = Depends(get_db)): 
    new_user = db.query(User).filter(User.mobile == data.mobile).first()
    if new_user:
        raise HTTPException(status_code=400, detail="user already exists")
       
    user = User(
        id=str(uuid.uuid4()),
        mobile=data.mobile,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    token = jwt.encode(
        {"user_id": user.id},
        jwt_secret,
        algorithm="HS256"
    )

    # 6. Store JWT in Redis with expiration
    redis_client.setex(
        f"user:{user.id}:token",
        JWT_EXPIRE,
        token
    )

    # 7. Set secure HTTP-only cookie
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        secure=os.getenv("ENVIRONMENT") == "production",  # True in prod, False in dev
        samesite="lax"
    )

    return {
        "message": "User registered successfully",
        "user_id": user.id
    }

def login(data: UserSchema, response: Response, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="user not found") 
    
    hash_password = hashpw(data.password.encode("utf-8"),user.password.encode("utf-8"))
    if not hash_password:
        raise HTTPException(status_code=401, detail="invalid credentials")

    token = jwt.encode(
        {"user_id": user.id},
        jwt_secret,
        algorithm="HS256"
    )


    redis_client.setex(
        f"user:{user.id}:token",
        JWT_EXPIRE,
        token
    )

    # 7. Set secure HTTP-only cookie
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        secure=os.getenv("ENVIRONMENT") == "production",  # True in prod, False in dev
        samesite="lax"
    )

    return {
        "message": "User registered successfully",
        "user_id": user.id
    }
     
def logoutUser(user_id:str,response: Response):
    redis_client.delete(f"user:{user_id}:token")
    response.delete_cookie("token")
    return {
        "message": "User logged out successfully"
    }

def send_otp(mobile_number: str):
    try:
        verification = client.verify.v2.services(verify_sid).verifications.create(to=mobile_number, channel="sms")
        return verification.sid
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def verify_otp(mobile: str, otp: str):
    try:
        verification_check = client.verify.v2.services(verify_sid).verification_checks.create(to=mobile, code=otp)
        return verification_check.status
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))