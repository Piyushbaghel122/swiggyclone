import os
from os import getenv
import re
import jwt
import bcrypt
import pyotp
import qrcode
import io
import base64
from dotenv import load_dotenv
from bcrypt import hashpw, checkpw
from fastapi import  Depends, HTTPException, Response, Body , Request
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from pydantic import BaseModel
from app.schemas.user import UserSchema
from app.validator.user_validator import RegisterValidator, LoginValidator, VerifyOTPValidator, ResendOTPValidator
from app.core.database import get_db
from app.core.redis import redis_client
from app.models.user import User , Blacklist
from app.middleware.auth_middleware import auth_middleware
from twilio.rest import Client 

load_dotenv() 


account_sid = getenv("TWILIO_ACCOUNT_SID")
auth_token = getenv("TWILIO_AUTH_TOKEN")
verify_sid = getenv("TWILIO_VERIFY_SID")

client = Client(account_sid, auth_token)

load_dotenv()

async def registerUser(data: RegisterValidator, response: Response, db: Session = Depends(get_db)):
    try:
        user_Email = db.query(User).filter(User.email == data.email).first()
        if user_Email:
            raise HTTPException(status_code=400, detail="User Email already exists")
  
        if len(data.password) < 15:
            raise HTTPException(status_code=400, detail="Password must be at least 8 characters long")

        if data.password != data.confirm_password:
            raise HTTPException(status_code=400, detail="Password and Confirm Password do not match")
        user_name = getattr(data, "user_name", None) or getattr(data, "username", "user")
        hashed_password = hashpw(data.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        emailRegex = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')

        if not emailRegex.match(data.email):
            raise HTTPException(status_code=400, detail="Invalid email format")

        new_user = User(
            user_name=user_name,
            email=data.email,
            countryCode = data.countryCode,
            mobilenumber=data.mobile_number,
            password=hashed_password,
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        try:
            verification = client.verify.v2.services(verify_sid).verifications.create(to=data.mobile_number, channel="sms")
        except Exception as e:
            print(f"Twilio SMS Error: {e}")

        # token generation
        jwt_secret = getenv("JWT_SECRET", "secret_key")
        token = jwt.encode(
            {"user_id": new_user.user_id},
            jwt_secret,
            algorithm="HS256"
        )
        redis_client.set(f"user_{new_user.user_id}", token)
        response.set_cookie(
            key="token",
            value=token,
            httponly=True,
            secure=os.getenv("ENVIRONMENT") == "production",
            samesite="lax"
        )
        await redis_client.set(f"user_{new_user.user_id}", token)
        return {
            "message": "User registered successfully",
            "data": { 
                "user_id": new_user.user_id,
                "user_name": new_user.user_name,
                "email": new_user.email,
                "mobilenumber": new_user.mobilenumber,
                "password": new_user.password,
                "token": token
             }, 
             "status": 201
        }
    except HTTPException as he:
        raise he
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))


async def LoginUser(data: LoginValidator, response: Response, db: Session = Depends(get_db)):
    try:
        user = db.query(User).filter(User.email == data.email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        if not checkpw(data.password.encode('utf-8'), user.password.encode('utf-8')):
            raise HTTPException(status_code=401, detail="Invalid password")
        
        hash = hashpw(data.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        user = User(
            user_id=user.user_id,
            email=user.email,
            password = hash 
        )

        token = jwt.encode(
            {"user_id": user.user_id},
            getenv("JWT_SECRET", "secret_key"),
            algorithm="HS256"
        )
        redis_client.set(f"user_{user.user_id}", token)
        response.set_cookie(
            key="token",
            value=token,
            httponly=True,
            secure=os.getenv("ENVIRONMENT") == "production",
            samesite="lax"
        )
        await redis_client.set(f"user_{user.user_id}", token)
        return {
            "message": "User logged in successfully",
            "data": {
                "user_id": user.user_id,
                "mobilenumber": user.mobilenumber,
                "password": user.password,
                "token": token
            }, 
            "status": 200
        }
    
    except HTTPException as he:
        raise he
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))

async def LogoutUser(request: Request, response: Response, db: Session = Depends(get_db)):
    try:
        token = request.cookies.get("token") or request.headers.get("Authorization")
        if token and token.startswith("Bearer "):
            token = token.split(" ", 1)[1].strip()

        if token:
            # Check if already blacklisted to prevent duplicate errors
            exists = db.query(Blacklist).filter(Blacklist.token == token).first()
            if not exists:
                blacklisted_token = Blacklist(token=token)
                db.add(blacklisted_token)
                db.commit()
                
            try:
                payload = jwt.decode(token, getenv("JWT_SECRET", "secret_key"), algorithms=["HS256"])
                user_id = payload.get("user_id")
                if user_id:
                    await redis_client.delete(f"user_{user_id}")
            except jwt.PyJWTError:
                pass

        response.delete_cookie("token")
        return {
            "message": "User logged out successfully",
            "status": 200
        }
    except Exception as e:
        import traceback
        trace = traceback.format_exc()
        print(f"Logout Error: {trace}")
        return {"error": str(e), "trace": trace}



async def getMe(request: Request, db: Session = Depends(get_db)):
     user = request.state.user
     if not user:
         raise HTTPException(status_code=404, detail="User not found")
     return {
         "message": "User found",
         "data": {
             "user_id": user.user_id,
             "user_name": user.user_name,
             "email": user.email,
             "mobilenumber": user.mobilenumber,
         }, 
         "status": 200
     }


async def getMobile(mobilenumber: str, db: Session = Depends(get_db)):
    try:
        user = db.query(User).filter(User.mobilenumber == mobilenumber).first()
        if user:
            return {
                "message": "Mobile number found",
                "exists": True,
                "data": {
                    "mobilenumber": user.mobilenumber,
                    "user_id": user.user_id
                },
                "status": 200
            }
        else:
            return {
                "message": "Mobile number not found",
                "exists": False,
                "status": 404
            }
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))

async def verifyOtpFunc(data: VerifyOTPValidator):
    try:
        verification_check = client.verify.v2.services(verify_sid).verification_checks.create(
            to=data.mobile_number, 
            code=data.otp
        )
        if verification_check.status == "approved":
            return {"message": "OTP verified successfully", "status": 200}
        else:
            raise HTTPException(status_code=400, detail="Invalid OTP")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to verify OTP: {str(e)}")

async def resendOtpFunc(data: ResendOTPValidator):
    try:
        verification = client.verify.v2.services(verify_sid).verifications.create(
            to=data.mobile_number, 
            channel="sms"
        )
        return {"message": "OTP resent successfully", "status": 200}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to resend OTP: {str(e)}")


async def onboard(user_id:int , response:Response , db:Session = Depends(get_db)):
    try:
        user = db.query(User).filter(User.user_id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return {"user": user, "message": "User fetched successfully", "status": 200}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
   
      