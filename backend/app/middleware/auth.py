from fastapi import Request , HTTPException , Depends 
from sqlalchemy.orm import Session

from os import getenv
import jwt
from app.schemas.user import UserSchema
from app.core.redis import redis_client
from app.core.database import get_db
from app.models.user import User 


def auth_Middleware(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("token") or request.headers.get("Authorization")
    if not token:
        raise HTTPException(
            status_code=401,
            detail="Unauthorized"
        )
    payload = jwt.verify(token, getenv("JWT_SECRET"), algorithms=["HS256"])
    user = db.query(User).filter(User.id == payload["user_id"]).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    request.user = user 
    return user 