from fastapi import HTTPException , Depends , status 
from sqlalchemy.orm import Session
from pydantic import BaseModel , Optional 
from typing import Optional , List 
import json 
import uuid 

from app.core.database import get_db 
from app.models.address import Address