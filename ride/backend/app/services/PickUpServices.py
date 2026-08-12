from fastapi import HTTPException 
from sqlalchemy.orm import Session 
from datetime import datetime 

from app.models.order import pickedOrder

class PickedOrderService:
    
    @staticemethod
    def 