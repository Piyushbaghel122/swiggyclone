from fastapi import HTTPException , json 

from app.core.database import get_db
from app.core.redis import redis_client
from app.middleware.auth import auth_Middleware
from pydantic import BaseModel
from typing import Optional 
from sqlalchemy.orm  import Session , Base
from sqlalchemy import Column , Integer , String 
from sqlalchemy.sql import func 


class ride(Base):
    
    pickup: str



async def Ride_controller():
