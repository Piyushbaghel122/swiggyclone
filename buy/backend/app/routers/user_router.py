from fastapi import APIRouter , Depends
from app.controllers.user_controller import register, login, logout, sendlink
from app.middleware.auth import auth_Middleware

AUTHRouter = APIRouter(tags=["Users"])

AUTHRouter.add_api_route("/register", register, methods=["POST"])
AUTHRouter.add_api_route("/login", login, methods=["POST"])
AUTHRouter.add_api_route("/logout", logout, methods=["POST"])
AUTHRouter.add_api_route("/sendlink", sendlink, methods=["POST"])


