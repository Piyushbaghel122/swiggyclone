from fastapi import HTTEXception , Exception , Resposne 
from app.core.database import Base
from app.core.redis import redis_client
from app.services.rider_order_service import  RidersOrderServoices

import jwt 
from os import getenv 
from pyandic import BaseModel
import json 
from sqlalchemy.orm import Session  
from sqlalchemy import Cloumn ,Integer , String 
from sqlalchemy.sql import func 
from typing import Opetional
from app.middleware.auth_middleare import auth_middleware
import uuid
from app.models import rider 
from app.moudels.order import Order

class AssignOrder(BaseModel):
    rider_id:int 

class RejectOrder(BaseModel):
    reason: str

class OrderResponse(BaseModel):
    id: int 
    status: str 

    class config: 
      from_attributes = True
      
class Rider(Base):
    __tablename__ = "riders"

    id = Column(Integer, primary_key=True , nullable=False)
    name = Column(String(100) , nullable=False)
    status = Column(String(20) , nullable=False)

class  RiderService(): 
    def online(self , rider): 
        rider.status = "online"
        return rider
    
    def offline(self , rider):
        rider.status = "offline"
        return rider

class RiderRepository:

    def get_rider(self, db, rider_id):
        return db.query(Rider).filter(Rider.id == rider_id).first()

    def save(self, db, rider):
        db.commit()
        db.refresh(rider)

def make_rider_online(rider_id: int, db: Session):
    repo = RiderRepository()
    service = RiderService()
    rider = repo.get_rider(db, rider_id)
    if not rider:
        raise Exception("Rider not found")
    rider = service.online(rider)
    repo.save(db, rider)
    return rider

def make_rider_offline(rider_id: int, db: Session):
    repo = RiderRepository()
    service = RiderService()
    rider = repo.get_rider(db, rider_id)
    if not rider:
        raise Exception("Rider not found")
    rider = service.offline(rider)
    repo.save(db, rider)
    return rider



class RiderOrderController():

    @staticmethod
    def accpet_order(order_id:int , db:Session):
        return RidersOrderServices.accept_order(order_id, db)

    @staticmethod
    def reject_order(order_id: int,reason: str,db: Session):
        return RidersOrderServices.reject_order( order_id, reason,db)


    @staticmethod 
    def cancel_order(order_id:int ,reason: str , db:Session):
        return RidersOrderServices.cancel_order(order_id ,reason , db)

    @staticmethod
    def pending_order(order_id:int , db:Session):
        return RidersOrderServices.pending_order(order_id , db)
