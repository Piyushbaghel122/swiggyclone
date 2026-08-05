from app.core.database import get_db
from app.core.redis import redis_client
from os import getenv 
import jwt 
from app.schemas.user import UserSchema
from app.modules.user import User
from fastapi import FastAPI , Depends , HTTPException 
 

async def auth_middleware( response:Response , db: Session = Depends(get_db)):
    try:
        jwt_token = db.query 

