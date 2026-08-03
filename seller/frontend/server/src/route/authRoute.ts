import express from "express";
import { CreateVPA , AadhaarNumber , sendOtp, UpdateFssai, UpdateGst , RegisterUser , LoginUser , LogoutUser } from "../controller/AuthController";

const AuthRoute = express.Router();

AuthRoute.post("/pancard", CreateVPA);
AuthRoute.post("/address", AadhaarNumber);
AuthRoute.post("/sendOtp", sendOtp);
AuthRoute.post("/fssai", UpdateFssai);
AuthRoute.post("/gst", UpdateGst);
AuthRoute.post("/register", RegisterUser);
AuthRoute.get("/login", LoginUser);
AuthRoute.post("/logout" , LogoutUser);

export default AuthRoute;