from fastapi import APIRouter
from app.controllers.user_controller import register, login, logout, change_password, sendlink

AUTHRouter = APIRouter(tags=["Users"])

AUTHRouter.add_api_route("/register", register, methods=["POST"])
AUTHRouter.add_api_route("/login", login, methods=["POST"])
AUTHRouter.add_api_route("/logout", logout, methods=["POST"])
AUTHRouter.add_api_route("/changepassword", change_password, methods=["POST"])
AUTHRouter.add_api_route("/sendlink", sendlink, methods=["POST"])
