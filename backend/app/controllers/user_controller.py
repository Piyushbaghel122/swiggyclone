from fastapi import Depends, HTTPException, Response , BackgroundTasks 
from sqlalchemy.orm import Session 
from passlib.context import CryptContext 
from pydantic import BaseModel
from datetime import datetime , timedelta
import jwt 
from os import getenv
import secrets


from app.core.database import get_db
from app.models.user import User , sendLink
from app.core.redis import redis_client 

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

JWT_SECRET = getenv("JWT_SECRET", "secret_key")
JWT_EXPIRE = 60 * 60 * 24
fake_token_db = {} 


class UserSchema(BaseModel): 
    name: str 
    email: str
    mobile: str
    password: str

class sendLinkSchema(BaseModel): 
    email: str

class MessageResponse(BaseModel): 
    message: str


def register(data: UserSchema, response: Response, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == data.email).first()

    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed = pwd_context.hash(data.password)

    user = User(
        name=data.name,
        email=data.email,
        hashed_password=hashed
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    token = jwt.encode(
        {"user_id": user.id},
        getenv("JWT_SECRET"),
        algorithm="HS256"
    )

    # Store JWT in Redis
    redis_client.setex(
        f"user:{user.id}:token",
        getenv("JWT_SECRET"),
        token
    )

    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        secure=False,
        samesite="lax"
    )

    return {
        "message": "User registered successfully",
        "user_id": user.id
    }


def login(data: UserSchema , response: Response , db: Session = Depends(get_db)):
    
    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not pwd_context.verify(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = jwt.encode(
        {"user_id": user.id},
        getenv("JWT_SECRET"),
        algorithm="HS256"
    )

    # Store JWT in Redis
    redis_client.setex(
        f"user:{user.id}:token",
        getenv("JWT_SECRET"),
        token
    )

    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        secure=False,
        samesite="lax"
    )

    return {
        "message": "User logged in successfully",
        "user_id": user.id
    }


def logout(id: int , response:Response , db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == id).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    redis_client.delete(f"user:{user.id}:token")
    response.delete_cookie("token")
    return {"message": "User logged out successfully"}


def change_password():
    return {"message": "Change password endpoint not implemented yet"}


def send_email_background(email: str, reset_token: str):
    reset_link = f"http://localhost:3000/changepasword?token={reset_token}"
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


