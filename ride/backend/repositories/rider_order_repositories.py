from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.modules.order import Order

class RiderOrderRepository():

    @staticmethod
    def get_order(db:Session , order_id:int):
        order = db.query(Order).filter(Order.id == order_id).first()

        if not order:
            raise HTTPException(status_code=404 , detail="order not found")
    
    return order

    @staticmethod
def save(db:Session , order:order):

    db.commit()
    db.refresh(order)

    return order

@staticmethod
def pending_orders(db:Session , rider_int:int):

    return db.query(Order).filter(Order.rider_id == rider_id , Order.status == "pending").all()
