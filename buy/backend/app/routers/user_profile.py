from fastapi import APIRouter , Depends 
from app.controllers.user_controller import userProfile
from app.middleware.auth import auth_Middleware

UserProfileRouter = APIRouter(tags=["User Profile"])

UserProfileRouter.add_api_route("/profile", userProfile, methods=["GET"])