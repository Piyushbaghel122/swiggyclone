from fastapi import HTTPException 
from sqlalchemy.orm import Session 
from datetime import datetime 

from app.modules.order import Order

class RidersOrderServoices():

    @staticmethod
    def appect_order(order_id:int , db: Session):
        order = db.query(Order).filter(Order.id == order_id).first()

        if not order: 
            raise HTTPException(
                status_code=404, 
                detail="Order not found"
            )
      
        if order.status != "assigned":
            raise HTTPException(status_code=400 , detail="order not found" )

        order.status = "accepted"
        order.accepted_at = datetime.now()

        db.commit()
        db.refresh(order)

        return {
            "Success": True,
            "message": "Order accepted successfully",
            "order_id": order.id,
            "status": order.status,
            "acceptedAt": order.accepted_at
        }
 
    @staticmethod
    def reject_order(order_id:int , db: Session):
        order = db.query(Order).filter(Order.id == order_id).first()

        if not order: 
            raise HTTPException(
                status_code=404, 
                detail="Order not found"
            )
      
        if order.status != "assigned":
            raise HTTPException(status_code=400 , detail="order not found" )

        order.status = "rejected"
        order.rejected_at = datetime.now()
        
        
        db.add(order)
        db.commit()
        db.refresh(order)

        return {
            "Success": True,
             "message": "Order rejected successfully",
             "order_id": order.id,
             "status": order.status,
             "rejectedAt": order.rejected_at
        }

@staticmethod
def cancel_order(order_int: int , reason:str , db:Session ):
    order = db.query(Order).filter(Order.id == order_id).first()

if not order:
    raise HTTPException(status_code=404 , detail="Order not found")

order.status = "cancelled"
order.cancel_reasion = reasion
order.cancelled_at = datetime.utcow()

db.commit()
db.refresh(order)

return {  
    "success":True,
     "message": "Order cancelled Successfully",
     "orderId": order.id,
     "status": order.status,
     "reason": reason
}

@staticmethod
def pending_order(order_id:int , db:Session ):
    order = db.query(Order).filter(Order.id == order_id).first()

if not order:
    raise HTTPException(status_code=404 , detail="Order not found")

order.status = "pending"
order.pending_at = datetime.now()

db.commit()
db.refresh(order)

return {  
    "success":True,
     "message": "Order pending Successfully",
     "orderId": order.id,
     "status": order.status,
     "pendingAt": order.pending_at
}

