from fastapi import APIRouter , Depends , HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.user import UserSchema
from app.controller.auth_controller import registerUser , login , logoutUser , send_otp , verify_otp



def auth_router():
    router = APIRouter()
    router.add_api_route("/register", registerUser, methods=["POST"])
    router.add_api_route("/login", login, methods=["POST"])
    router.add_api_route("/logout", logoutUser, methods=["POST"])
    router.add_api_route("/sendOtp", send_otp, methods=["POST"])
    router.add_api_route("/verifyOtp", verify_otp, methods=["POST"])
    return router
    