from fastapi import APIRouter
from app.controllers.payment_controller import create_order, verify_payment, get_razorpay_key

PaymentRouter = APIRouter(tags=["Payments"])

PaymentRouter.add_api_route("/create-order", create_order, methods=["POST"])
PaymentRouter.add_api_route("/verify-payment", verify_payment, methods=["POST"])
PaymentRouter.add_api_route("/get-key", get_razorpay_key, methods=["GET"])
