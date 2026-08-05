from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.controller.ride_controller import make_rider_online, make_rider_offline , RiderOrderController
from app.core.database import get_db 
from app.services.ride_servcies import OrderService
from app.schemas.ride_order import RejectOrder

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

@router.post("/{order_id}/reject")
def reject(order_id: int, reject_order: RejectOrder, db: Session = Depends(get_db)):
    try:
        order = RiderOrderController.reject_order(order_id, reject_order.reason, db)
        return {"message": "success", "order": order}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

router = APIRouter(
    prefix="/riders/orders", 
    tags =["Riders Orders"]
)

@router.post("/{order_id}/accept")
def accept(order_id:int, db: Session = Depends(get_db)):
    try: 
        order = RiderOrderController.accpet_order(order_id,db)
        return {"message" : "success" , "order" : order }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/{order_id}/reject")
def reject(order_id:int , reason:str,db: Session = Depends(get_db)):
    try:
        order = RiderOrderController.reject_order(order_id , reason,db)
        return {"message" : "success" , "order" : order }
    
    except Exception as e:
        raise HTTPException(status_code=400 , detail=str(e))

@router.post("/{order_id}/cancel")
def cancel(order_id:int , reason:str,db:Session = Depends(get_db)):
    try:
        order = RiderOrderController.cancel_order(order_id , reason,db)
        return {"message" : "success" , "order" : order }
    except Exception as e:
        raise HTTPException(status_code=400 , detail=str(e)) 

@router.get("/{order_id}/pending")
def pending(order_id:int , db:Session = Depends(get_db)):
    try: 
        order = RiderOrderController.pending_order(order_id , db)
        return {"message" : "success" , "order" : order }
    except Exception as e:
        raise HTTPException(status_code=400 , detail=str(e)) 