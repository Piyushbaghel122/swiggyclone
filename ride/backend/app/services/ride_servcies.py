from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.modules.order import Order


class OrderService:

    @staticmethod
    def available_orders(db: Session):
        return db.query(Order).filter(Order.status == "available").all()

    @staticmethod
    def get_order(db: Session, order_id: int):
        order = db.query(Order).filter(Order.id == order_id).first()
        
        if not order:
            raise HTTPException(
                status_code=404,
                detail="Order not found"
            )

        return order

    @staticmethod
    def assign_order(db: Session, order_id: int, rider_id: int):
        order = OrderService.get_order(db, order_id)

        order.rider_id = rider_id
        order.status = "assigned"

        db.commit()
        db.refresh(order)

        return order

    @staticmethod
    def accept_order(
        db: Session,
        order_id: int
    ):

        order = OrderService.get_order(
            db,
            order_id
        )

        order.status = "accepted"

        db.commit()
        db.refresh(order)

        return order

    @staticmethod
    def reject_order(
        db: Session,
        order_id: int
    ):

        order = OrderService.get_order(
            db,
            order_id
        )

        order.rider_id = None
        order.status = "available"

        db.commit()
        db.refresh(order)

        return order

    @staticmethod
    def assigned_orders(db: Session,rider_id: int):
        return db.query(Order).filter(
            Order.rider_id == rider_id
        ).all()

    @staticmethod
    def history(
        db: Session,
        rider_id: int
    ):

        return db.query(Order).filter(
            Order.rider_id == rider_id,
            Order.status.in_(
                [
                    "delivered",
                    "cancelled"
                ]
            )
        ).all()
