from fastapi import APIRouter
from app.controller.user_controller import (
    registerUser, LoginUser , LogoutUser, getMe, getMobile, verifyOtpFunc, resendOtpFunc
)
from app.middleware.auth_middleware import auth_middleware
from fastapi import Depends
router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

router.add_api_route("/register", registerUser,  methods=["POST"])
router.add_api_route("/login",LoginUser, methods=["POST"])
router.add_api_route("/logout", LogoutUser, methods=["POST"])
router.add_api_route("/getMe", getMe, methods=["GET"], dependencies=[Depends(auth_middleware)])
router.add_api_route("/mobile", getMobile, methods=["GET"])

# Google OAuth routes
# router.add_api_route("/google/login", google_login_url, methods=["GET"])
# router.add_api_route("/google/callback", google_auth_callback, methods=["GET"])
# router.add_api_route("/google/token", google_auth_token, methods=["POST"])

# GitHub OAuth routes
# router.add_api_route("/github/login", github_login_url, methods=["GET"])
# router.add_api_route("/github/callback", github_auth_callback, methods=["GET"])
# router.add_api_route("/github/token", github_auth_token, methods=["POST"])

# 2FA routes
# router.add_api_route("/2fa/enable", enable2FA, methods=["POST"])
# router.add_api_route("/2fa/verify", verify2FA, methods=["POST"])
# router.add_api_route("/2fa/login", login2FA, methods=["POST"])
# router.add_api_route("/2fa/disable", disable2FA, methods=["POST"])
# router.add_api_route("/2fa/status", status2FA, methods=["GET"])

# OTP routes
# router.add_api_route("/send-otp", sendOtpFunc, methods=["POST"])
router.add_api_route("/verify-otp", verifyOtpFunc, methods=["POST"])
router.add_api_route("/resend-otp", resendOtpFunc, methods=["POST"])
# router.add_api_route("/send-message", sendMessageFunc, methods=["POST"])
