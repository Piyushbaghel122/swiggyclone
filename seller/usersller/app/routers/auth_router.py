from fastapi import APIRouter
from app.controller.user_controller import (
    registerUser, loginUser, mobileUser, UserInfo, restaurantName, 
    workweekschudle, logoutUser, chnagePassowrd,
    google_login_url, google_auth_callback, google_auth_token,
    github_login_url, github_auth_callback, github_auth_token,
    enable2FA, verify2FA, login2FA, disable2FA, sendOtpFunc, verifyOtpFunc, resendOtpFunc, status2FA, getMe, sendMessageFunc
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

router.add_api_route("/register", registerUser, methods=["POST"])
router.add_api_route("/login", loginUser, methods=["POST"])
router.add_api_route("/logout", logoutUser, methods=["POST"])
router.add_api_route("/change-password", chnagePassowrd, methods=["POST"])
router.add_api_route("/me", getMe, methods=["GET"])

# Google OAuth routes
router.add_api_route("/google/login", google_login_url, methods=["GET"])
router.add_api_route("/google/callback", google_auth_callback, methods=["GET"])
router.add_api_route("/google/token", google_auth_token, methods=["POST"])

# GitHub OAuth routes
router.add_api_route("/github/login", github_login_url, methods=["GET"])
router.add_api_route("/github/callback", github_auth_callback, methods=["GET"])
router.add_api_route("/github/token", github_auth_token, methods=["POST"])

# 2FA routes
router.add_api_route("/2fa/enable", enable2FA, methods=["POST"])
router.add_api_route("/2fa/verify", verify2FA, methods=["POST"])
router.add_api_route("/2fa/login", login2FA, methods=["POST"])
router.add_api_route("/2fa/disable", disable2FA, methods=["POST"])
router.add_api_route("/2fa/status", status2FA, methods=["GET"])

# OTP routes
router.add_api_route("/send-otp", sendOtpFunc, methods=["POST"])
router.add_api_route("/verify-otp", verifyOtpFunc, methods=["POST"])
router.add_api_route("/resend-otp", resendOtpFunc, methods=["POST"])
router.add_api_route("/send-message", sendMessageFunc, methods=["POST"])

