from fastapi import Depends, HTTPException, Response, BackgroundTasks 
from sqlalchemy.orm import Session 
from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import Optional
import jwt 
from os import getenv
import os

 

from app.core.database import get_db
from app.models.user import User, sendLink, DBUserProfile as DBUserProfile
from app.core.redis import redis_client 
from app.middleware.auth import auth_Middleware

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
    except Exception:
        return False


JWT_SECRET = getenv("JWT_SECRET", "secret_key")
JWT_EXPIRE = 60 * 60 * 24
fake_token_db = {} 


class sendOtp(BaseModel):
    message: str
    otp: int


class EditProfile(BaseModel): 
    username: str
    lastname: str
    email: str
    mobile: str
    gender: str
    dateOfBirth: str
    address: str 


class UserProfile(BaseModel):
    id: int
    name: str
    email: str
    mobile: str
    profileImage: Optional[str] = None
    gender: Optional[str] = None
    dateOfBirth: Optional[str] = None
    credits: Optional[int] = None
    swiggyOne: Optional[bool] = None
    createdAt: Optional[str] = None

class EditProfileResponse(BaseModel):
    message: str
    user: Optional[UserProfile] = None

class UserSchema(BaseModel): 
    username: Optional[str] = None
    email: str
    mobile: str
    password: str

class LoginSchema(BaseModel):
    email: str
    password: str

class sendLinkSchema(BaseModel): 
    email: str

class MessageResponse(BaseModel): 
    message: str

"""
{
  "success": true,
  "user": {
    "id": 1,
    "name": "Piyush Kumar",
    "email": "piyush@gmail.com",
    "mobile": "9876543210",
    "profileImage": "https://cdn.example.com/profile.jpg",
    "gender": "Male",
    "dateOfBirth": "2005-08-08",
    "credits": 1240,
    "swiggyOne": true,
    "createdAt": "2026-07-26T10:00:00Z"
  }
}
"""

def userProfile(user: User = Depends(auth_Middleware), db: Session = Depends(get_db)):
    profile = db.query(DBUserProfile).filter(DBUserProfile.user_id == user.id).first()
    if not profile:
        profile = DBUserProfile(
            user_id=user.id,
            profileImage="https://cdn-icons-png.flaticon.com/512/149/149071.png",
            gender="Not Specified",
            dateOfBirth="2000-01-01",
            credits=0,
            swiggyOne=False
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)

    return {
        "success": True,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "mobile": user.mobile,
            "profileImage": profile.profileImage,
            "gender": profile.gender,
            "dateOfBirth": profile.dateOfBirth,
            "credits": profile.credits,
            "swiggyOne": profile.swiggyOne,
            "createdAt": str(user.created_at) if user.created_at else None
        }
    }

def register(data: UserSchema, response: Response, db: Session = Depends(get_db)):
    # 1. Check if user already exists by email
    existing_email = db.query(User).filter(User.email == data.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Check if mobile already exists
    existing_mobile = db.query(User).filter(User.mobile == data.mobile).first()
    if existing_mobile:
        raise HTTPException(status_code=400, detail="Mobile number already registered")

    # 2. Hash the password
    hashed = hash_password(data.password)

    # 3. Create the user instance (handling name/username schema field safely)
    user_name = getattr(data, "username", None) or getattr(data, "name", "User")
    
    user = User(
        name=user_name,
        email=data.email,
        mobile=data.mobile,
        hashed_password=hashed
    )

    # 4. Persist to database
    db.add(user)
    db.commit()
    db.refresh(user)

    # 4.1 Automatically create a default profile for the new user
    default_profile = DBUserProfile(
        user_id=user.id,
        profileImage="https://cdn-icons-png.flaticon.com/512/149/149071.png",
        gender="Not Specified",
        dateOfBirth="2000-01-01",
        credits=0,
        swiggyOne=False
    )
    db.add(default_profile)
    db.commit()


    # 5. Generate JWT token
    jwt_secret = os.getenv("JWT_SECRET", "secret_key")

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

def login(data: LoginSchema, response: Response, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    jwt_secret = os.getenv("JWT_SECRET", "secret_key")

    token = jwt.encode(
        {"user_id": user.id},
        jwt_secret,
        algorithm="HS256"
    )

    # Store JWT in Redis
    redis_client.setex(
        f"user:{user.id}:token",
        JWT_EXPIRE,
        token
    )

    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        secure=os.getenv("ENVIRONMENT") == "production",
        samesite="lax"
    )

    return {
        "message": "User logged in successfully",
        "user_id": user.id
    }


def logout(response: Response, id: Optional[int] = None, db: Session = Depends(get_db)):
    if id is not None:
        user = db.query(User).filter(User.id == id).first()
        if user:
            redis_client.delete(f"user:{user.id}:token")
    response.delete_cookie("token")
    return {"message": "User logged out successfully"}


def change_password():
    return {"message": "Change password endpoint not implemented yet"}


def send_email_background(email: str, reset_token: str):
    reset_link = f"https://swiggyclone-6j9v.vercel.app/reset-password?token={reset_token}"
    print(f"--- EMAIL SIMULATION ---")
    print(f"To: {email}")
    print(f"Subject: Password Reset Request")
    print(f"Click the link to reset your password: {reset_link}")
    print(f"------------------------")


def sendlink(data: sendLinkSchema, response: Response, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()

    if not user: 
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    reset_token = secrets.token_urlsafe(32)

    # Check if a reset link already exists for this email to prevent unique constraint violations
    existing_link = db.query(sendLink).filter(sendLink.email == data.email).first()
    if existing_link:
        existing_link.sendLink = reset_token
        SendLink_obj = existing_link
    else:
        SendLink_obj = sendLink(
            email=data.email,
            sendLink=reset_token
        )
        db.add(SendLink_obj)

    db.commit()
    db.refresh(SendLink_obj)

    # Schedule sending the email in the background
    background_tasks.add_task(send_email_background, data.email, reset_token)

    return {"message": "Password reset link sent successfully"}




