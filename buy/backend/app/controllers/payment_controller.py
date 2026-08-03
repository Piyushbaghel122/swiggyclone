from razorpay import Client
from os import getenv 
from fastapi import HTTPException
from pydantic import BaseModel
import jwt 

client = Client(auth=(getenv("RAZORPAY_KEY_ID"), getenv("RAZORPAY_KEY_SECRET")))


class CreateOrderSchema(BaseModel):
    amount: float
    currency: str = "INR"


class VerifyPaymentSchema(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str


def create_order(order_data: CreateOrderSchema): 
    try:
        options = {
            "amount": int(order_data.amount * 100),  # amount in the smallest currency unit (paise)
            "currency": order_data.currency,
        }
        # Note: In the Python SDK, it is client.order.create (singular 'order', not 'orders')
        order = client.order.create(data=options)
        return {"success": True, "order": order}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def verify_payment(payment_data: VerifyPaymentSchema):
    try:
        params_dict = {
            "razorpay_order_id": payment_data.razorpay_order_id,
            "razorpay_payment_id": payment_data.razorpay_payment_id,
            "razorpay_signature": payment_data.razorpay_signature,
        }
        # Verifies the payment signature; raises SignatureVerificationError if invalid
        client.utility.verify_payment_signature(params_dict)
        return {"success": True, "message": "Payment verified successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid payment signature")


def get_razorpay_key():
    return {"key": getenv("RAZORPAY_KEY_ID")}