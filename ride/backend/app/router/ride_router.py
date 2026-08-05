from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.controller.ride_controller import make_rider_online, make_rider_offline
from app.core.database import get_db 
from app.services.ride_servcies import OrderService

router = APIRouter(prefix="/rider", tags=["rider"])

@router.post("/{rider_id}/online")
def online(rider_id: int, db: Session = Depends(get_db)):
    try:
        rider = make_rider_online(rider_id, db)
        return {"message": "success", "rider": rider}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/{rider_id}/offline")
def offline(rider_id: int, db: Session = Depends(get_db)):
    try:
        rider = make_rider_offline(rider_id, db)
        return {"message": "success", "rider": rider}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

