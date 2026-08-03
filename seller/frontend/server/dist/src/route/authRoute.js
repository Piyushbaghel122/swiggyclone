"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controller/AuthController");
const AuthRoute = express_1.default.Router();
AuthRoute.post("/pancard", AuthController_1.CreateVPA);
AuthRoute.post("/address", AuthController_1.AadhaarNumber);
AuthRoute.post("/sendOtp", AuthController_1.sendOtp);
AuthRoute.post("/fssai", AuthController_1.UpdateFssai);
AuthRoute.post("/gst", AuthController_1.UpdateGst);
AuthRoute.post("/register", AuthController_1.RegisterUser);
AuthRoute.get("/login", AuthController_1.LoginUser);
AuthRoute.post("/logout", AuthController_1.LogoutUser);
exports.default = AuthRoute;
