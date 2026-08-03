import os
from os import getenv
import jwt
import bcrypt
import pyotp
import qrcode
import io
import base64
from dotenv import load_dotenv
from bcrypt import hashpw, checkpw
from fastapi import FastAPI, Depends, HTTPException, Request, Response, Body , requests 
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from pydantic import BaseModel


from app.core.database import get_db
from app.core.redis import redis_client
from app.models.user import User, Mobile, WorkweekschudleDB, DBUserInfo, restaurantNameDB
from app.middleware.auth_middleware import auth_Middleware
from app.services.google_auth import get_google_auth_url, exchange_code_for_user_info, get_user_info_from_token
from app.services.github_auth import get_github_auth_url, exchange_code_for_github_user, get_github_user_info_from_token
from app.services.twilio import send_otp, verify_otp, send_message
from app.schemas.user import UserSchema, sendOtp, verfiyOtp, sendMessage, UserInfoSchema, Workweekschudle, restaurantName

load_dotenv()



class chnagePassowrd(BaseModel): 
      new_password: str 
      confirm_password: str 

class sendLink(BaseModel):
    email: str
# 2FA Models
class Enable2FA(BaseModel):
    id: str 
    user_id: str 
    enabled: str 
    verified_at: str 
    created_at: datetime
    updated: datetime
    

class Verify2FA(BaseModel):
    id: str 
    user_id: str 
    code: str 

class Login2FA(BaseModel):
    user_id: int
    token: str

class Disable2FA(BaseModel):
    user_id: int
    password: str

class RecoveryCodes2FA(BaseModel):
    user_id: int
    password: str

class RecoveryLogin2FA(BaseModel):
    user_id: int
    recovery_code: str


class GoogleAuthCode(BaseModel):
    code: str


class GoogleAuthToken(BaseModel):
    token: str


class GithubAuthCode(BaseModel):
    code: str


class GithubAuthToken(BaseModel):
    token: str


def registerUser(data: UserSchema, response: Response, db: Session = Depends(get_db)):
    user_Email = db.query(User).filter(User.email == data.email).first()
    if user_Email:
        raise HTTPException(status_code=400, detail="User Email already exists")

    user_name = getattr(data, "user_name", None) or getattr(data, "username", "user")
    hashed_password = hashpw(data.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    new_user = User(
        user_name=user_name,
        email=data.email,
        password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

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

    return {"message": "User registered successfully"}

def mobileUser(data: UserSchema , response: Response  , db: Session = Depends(get_db)):
    mobile_number = getattr(data, "mobile_number", None)
    if not mobile_number: 
        raise HTTPException(status_code = 400 , detail = "Mobile number is required")
    userMobile = db.query(Mobile).filter(Mobile.mobile_number == mobile_number).first()
    if userMobile: 
        raise HTTPException(status_code = 400 , detail = "User mobile alraedy exists")
       
    user = Mobile(
        mobile_number = mobile_number
    )
    db.add(user)
    db.commit()
    db.refresh(user)
  
    JWT_SECRET = getenv("JWT_SECRET", "secret_key")
    token = jwt.encode(
        {"user_id": user.user_id},
        JWT_SECRET,
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
    return {"message": "User registered successfully"}


def restaurantName(data: restaurantName, response: Response, db: Session = Depends(get_db)):
    userExit = db.query(restaurantNameDB).filter(restaurantNameDB.name == data.name).first()
    if userExit:
        raise HTTPException(status_code=400, detail="Restaurant name already exists")

    user = restaurantNameDB(
        name=data.name
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    jwt_secret = getenv("JWT_SECRET", "secret_key")
    token = jwt.encode(
        {"user_id": user.id},
        jwt_secret,
        algorithm="HS256"
    )
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        secure=os.getenv("ENVIRONMENT") == "production",
        samesite="lax"
    )
    return {"message": "Restaurant name registered successfully"}


def UserInfo(data: UserInfoSchema, response: Response, db: Session = Depends(get_db)):
    user = db.query(DBUserInfo).filter(DBUserInfo.user_id == data.user_id).first()
    if user:
        raise HTTPException(status_code=400, detail="User info already exists")

    user = DBUserInfo(
        owername=data.owername,
        location=data.location,
        pincode=data.pincode,
        address=data.address,
        mobile_number=data.mobile_number,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    jwt_secret = getenv("JWT_SECRET", "secret_key")
    token = jwt.encode(
        {"user_id": user.id},
        jwt_secret,
        algorithm="HS256"
    )

    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        secure=os.getenv("ENVIRONMENT") == "production",
        samesite="lax"
    )
    return {"message": "User info registered successfully"}


def workweekschudle(data: Workweekschudle , response: Response , db:Session = Depends(get_db)):
    userExit = db.query(WorkweekschudleDB).filter(WorkweekschudleDB.user_id == data.user_id).first()
    if userExit:
        raise HTTPException(status_code=400, detail="Workweekschudle already exists")

    user = WorkweekschudleDB(
        user_id = data.user_id,
        monday = data.monday,
        tuesday = data.tuesday,
        wednesday = data.wednesday,
        thursday = data.thursday,
        friday = data.friday,
        saturday = data.saturday,
        sunday = data.sunday,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "Workweekschudle registered successfully"}

def loginUser(data: UserSchema, response: Response, db: Session = Depends(get_db)):
    userExity = db.query(User).filter(User.email == data.email).first()
    if not userExity:
        raise HTTPException(status_code=404, detail="User not found")
    if not checkpw(data.password.encode('utf-8'), userExity.password.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid password")
    
    JWT_SECRET = getenv("JWT_SECRET", "secret_key")
    token = jwt.encode(
        {"user_id": userExity.user_id},
        JWT_SECRET,
        algorithm="HS256"
    )
    redis_client.set(f"user_{userExity.user_id}", token)
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        secure=os.getenv("ENVIRONMENT") == "production",
        samesite="lax"
    )
    return {"message": "User logged in successfully"}

def logoutUser(request: Request, response: Response):
    token = request.cookies.get("token") or request.headers.get("Authorization")
    if token and token.startswith("Bearer "):
        token = token.replace("Bearer ", "").strip()
    if not token: 
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        jwt_secret = getenv("JWT_SECRET", "secret_key")
        payload = jwt.decode(token, jwt_secret, algorithms=["HS256"])
        user_id = payload.get("user_id")
        if user_id:
            redis_client.delete(f"user_{user_id}")
    except Exception:
        pass
    response.delete_cookie("token")
    return {"message": "User logged out successfully"}




def chnagePassowrd(data: chnagePassowrd, request: Request, response: Response, db: Session = Depends(get_db)):
    if data.new_password != data.confirm_password:
        raise HTTPException(status_code=400, detail="New password and confirm password do not match")

    token = request.cookies.get("token") or request.headers.get("Authorization")
    if token and token.startswith("Bearer "):
        token = token.replace("Bearer ", "").strip()
    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        jwt_secret = getenv("JWT_SECRET", "secret_key")
        payload = jwt.decode(token, jwt_secret, algorithms=["HS256"])
        user_id = payload.get("user_id")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    stored_token = redis_client.get(f"user_{user_id}")
    if not stored_token or stored_token != token:
        raise HTTPException(status_code=401, detail="Session expired or logged out")

    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    hashed_password = hashpw(data.new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    user.password = hashed_password
    db.commit()
    db.refresh(user)

    return {"message": "Password changed successfully"}


def _process_google_user(user_info: dict, response: Response, db: Session) -> dict:
    email = user_info.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Google account has no email address associated")
    
    user = db.query(User).filter(User.email == email).first()
    if not user:
        user_name = user_info.get("name") or email.split("@")[0]
        random_pass = os.urandom(16)
        hashed_password = hashpw(random_pass, bcrypt.gensalt()).decode('utf-8')
        user = User(
            user_name=user_name,
            email=email,
            password=hashed_password
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    jwt_secret = getenv("JWT_SECRET", "secret_key")
    token = jwt.encode(
        {"user_id": user.user_id},
        jwt_secret,
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
    return {
        "message": "Google authentication successful",
        "user": {
            "user_id": user.user_id,
            "user_name": user.user_name,
            "email": user.email
        },
        "token": token
    }


def google_login_url():
    return {"auth_url": get_google_auth_url()}


def google_auth_callback(code: str, response: Response, db: Session = Depends(get_db)):
    user_info = exchange_code_for_user_info(code)
    return _process_google_user(user_info, response, db)


def google_auth_token(data: GoogleAuthToken, response: Response, db: Session = Depends(get_db)):
    user_info = get_user_info_from_token(data.token)
    return _process_google_user(user_info, response, db)


def github_login_url():
    return {"auth_url": get_github_auth_url()}


def github_auth_callback(code: str, response: Response, db: Session = Depends(get_db)):
    user_info = exchange_code_for_github_user(code)
    return _process_google_user(user_info, response, db)


def github_auth_token(data: GithubAuthToken, response: Response, db: Session = Depends(get_db)):
    user_info = get_github_user_info_from_token(data.token)
    return _process_google_user(user_info, response, db)

def enable2FA(request: Request, response: Response, db: Session = Depends(get_db)):
    token = request.cookies.get("token") or request.headers.get("Authorization")
    if token and token.startswith("Bearer "):
        token = token.replace("Bearer ", "").strip()
    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        jwt_secret = getenv("JWT_SECRET", "secret_key")
        payload = jwt.decode(token, jwt_secret, algorithms=["HS256"])
        user_id = payload.get("user_id")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    secret = pyotp.random_base32()
    user.two_factor_secret = secret
    db.commit()

    totp = pyotp.TOTP(secret)
    provisioning_uri = totp.provisioning_uri(name=user.email, issuer_name="SwiggyClone")

    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(provisioning_uri)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()

    return {"qr_code_url": f"data:image/png;base64,{img_str}", "secret": secret}

def verify2FA(data: Verify2FA, request: Request, response: Response, db: Session = Depends(get_db)):
    token = request.cookies.get("token") or request.headers.get("Authorization")
    if token and token.startswith("Bearer "):
        token = token.replace("Bearer ", "").strip()
    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        jwt_secret = getenv("JWT_SECRET", "secret_key")
        payload = jwt.decode(token, jwt_secret, algorithms=["HS256"])
        user_id = payload.get("user_id")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.user_id == user_id).first()
    if not user or not user.two_factor_secret:
        raise HTTPException(status_code=400, detail="2FA not initiated or user not found")

    totp = pyotp.TOTP(user.two_factor_secret)
    if totp.verify(data.code):
        user.is_two_factor_enabled = True
        db.commit()
        return {"message": "2FA successfully verified and enabled"}
    else:
        raise HTTPException(status_code=400, detail="Invalid 2FA code")

def login2FA(data: Login2FA, response: Response, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == data.user_id).first()
    if not user or not user.is_two_factor_enabled:
        raise HTTPException(status_code=400, detail="2FA is not enabled for this user")

    totp = pyotp.TOTP(user.two_factor_secret)
    if totp.verify(data.token):
        jwt_secret = getenv("JWT_SECRET", "secret_key")
        token = jwt.encode(
            {"user_id": user.user_id},
            jwt_secret,
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
        return {"message": "User logged in successfully with 2FA"}
    else:
        raise HTTPException(status_code=400, detail="Invalid 2FA code")

def disable2FA(data: Disable2FA, request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("token") or request.headers.get("Authorization")
    if token and token.startswith("Bearer "):
        token = token.replace("Bearer ", "").strip()
    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        jwt_secret = getenv("JWT_SECRET", "secret_key")
        payload = jwt.decode(token, jwt_secret, algorithms=["HS256"])
        user_id = payload.get("user_id")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.user_id == user_id).first()
    if not user or not checkpw(data.password.encode('utf-8'), user.password.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid password")
    
    user.is_two_factor_enabled = False
    user.two_factor_secret = None
    db.commit()
    return {"message": "2FA disabled successfully"}

def status2FA(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("token") or request.headers.get("Authorization")
    if token and token.startswith("Bearer "):
        token = token.replace("Bearer ", "").strip()
    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        jwt_secret = getenv("JWT_SECRET", "secret_key")
        payload = jwt.decode(token, jwt_secret, algorithms=["HS256"])
        user_id = payload.get("user_id")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"is_two_factor_enabled": user.is_two_factor_enabled}

def sendOtpFunc(data: sendOtp, request: Request, db: Session = Depends(get_db)):
    sid = send_otp(data.mobile_number)
    return {"message": "OTP sent successfully", "sid": sid}

def verifyOtpFunc(data: verfiyOtp, request: Request, db: Session = Depends(get_db)):
    status = verify_otp(data.mobile_number, data.otp)
    if status == "approved":
        return {"message": "OTP verified successfully"}
    else:
        raise HTTPException(status_code=400, detail="Invalid OTP")

def resendOtpFunc(data: sendOtp, request: Request, db: Session = Depends(get_db)):
    return sendOtpFunc(data, request, db)

def sendMessageFunc(data: sendMessage, request: Request, db: Session = Depends(get_db)):
    sid = send_message(data.mobile_number, data.message)
    return {"message": "Message sent successfully", "sid": sid}


def getMe(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("token") or request.headers.get("Authorization")
    if token and token.startswith("Bearer "):
        token = token.replace("Bearer ", "").strip()
    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        jwt_secret = getenv("JWT_SECRET", "secret_key")
        payload = jwt.decode(token, jwt_secret, algorithms=["HS256"])
        user_id = payload.get("user_id")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
