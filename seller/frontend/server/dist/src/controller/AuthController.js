"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutUser = exports.LoginUser = exports.RegisterUser = exports.AuthNumber = exports.UpdateGst = exports.UpdateFssai = exports.verifyOtp = exports.sendOtp = exports.AadhaarNumber = void 0;
exports.CreateVPA = CreateVPA;
const panCardModel_1 = __importDefault(require("../models/panCardModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = __importDefault(require("../config/redis"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function CreateVPA(req, res) {
    try {
        const { panCardNumber } = req.body;
        let user = await panCardModel_1.default.findOne({
            panCardNumber
        });
        if (user) {
            return res.status(200).json({ message: "User already exists", user });
        }
        user = new panCardModel_1.default({
            panCardNumber,
            panNumber: "verify"
        });
        await user.save();
        return res.status(201).json({ message: "User created successfully", user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const AadhaarNumber = async (req, res) => {
    try {
        const { AadhaarNumber, panCardNumber } = req.body;
        if (String(AadhaarNumber).length !== 12) {
            return res.status(400).json({ message: "Invalid Aadhaar Number" });
        }
        let user = await panCardModel_1.default.findOne({ panCardNumber });
        if (user) {
            user.AadhaarNumber = AadhaarNumber;
            await user.save();
            return res.status(200).json({ message: "Aadhaar updated successfully", user });
        }
        // If no panCardNumber was provided, or user not found, create a new one
        user = new panCardModel_1.default({
            AadhaarNumber,
            panCardNumber,
            panNumber: "verify"
        });
        await user.save();
        return res.status(201).json({ message: "User created with Aadhaar", user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.AadhaarNumber = AadhaarNumber;
const sendOtp = async (req, res) => {
    try {
        const { AadhaarNumber, panCardNumber, phoneNumber } = req.body;
        if (!panCardNumber) {
            return res.status(400).json({ message: "panCardNumber is required" });
        }
        let user = await panCardModel_1.default.findOne({ panCardNumber });
        if (!user) {
            // Create the user if they do not exist
            user = new panCardModel_1.default({
                AadhaarNumber,
                panCardNumber,
                phoneNumber: phoneNumber || "+15558675310", // Default test number for Twilio if none provided
                panNumber: "verify"
            });
            await user.save();
        }
        // If user exists but needs phone number updated
        if (phoneNumber && user.phoneNumber !== phoneNumber) {
            user.phoneNumber = phoneNumber;
            await user.save();
        }
        if (!user.isVerified) {
            // You might want to allow sending OTP even if not verified, as OTP is usually FOR verification.
            // Commenting out the restriction so they can actually verify.
            // return res.status(401).json({message:"User not verified"})
        }
        // Generate a random 6-digit OTP
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        // Save OTP to user document
        user.otp = generatedOtp;
        await user.save();
        let token = jsonwebtoken_1.default.sign({ user_id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        });
        // Return the OTP in the response so the user can see it without SMS
        res.status(200).json({ message: "OTP sent successfully", otp: generatedOtp });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.sendOtp = sendOtp;
const verifyOtp = async (req, res) => {
    try {
        const { otp, panCardNumber } = req.body;
        if (!otp || !panCardNumber) {
            return res.status(400).json({ message: "OTP and panCardNumber are required" });
        }
        const user = await panCardModel_1.default.findOne({ panCardNumber });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.otp === String(otp)) {
            user.isVerified = true;
            await user.save();
            return res.status(200).json({ message: "OTP verified successfully" });
        }
        else {
            return res.status(400).json({ message: "Invalid OTP" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.verifyOtp = verifyOtp;
const UpdateFssai = async (req, res) => {
    try {
        const { fssaiLicense, panCardNumber } = req.body;
        if (!fssaiLicense || !panCardNumber) {
            return res.status(400).json({ message: "fssaiLicense and panCardNumber are required" });
        }
        const user = await panCardModel_1.default.findOne({ panCardNumber });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.fssaiLicense = fssaiLicense;
        await user.save();
        return res.status(200).json({ message: "FSSAI License updated successfully", user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.UpdateFssai = UpdateFssai;
const UpdateGst = async (req, res) => {
    try {
        const { gstNumber, panCardNumber } = req.body;
        if (!gstNumber || !panCardNumber) {
            return res.status(400).json({ message: "gstNumber and panCardNumber are required" });
        }
        const user = await panCardModel_1.default.findOne({ panCardNumber });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.gstNumber = gstNumber;
        await user.save();
        return res.status(200).json({ message: "GST Number updated successfully", user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.UpdateGst = UpdateGst;
const AuthNumber = async (req, res) => {
    const { phoneNumber } = req.body;
    let user = await panCardModel_1.default.findOne({ phoneNumber });
    if (user) {
        return res.status(200).json({
            message: "User logged in successfully",
            user
        });
    }
    // If user does not exist, create a new one
    user = await panCardModel_1.default.create({
        phoneNumber
    });
    return res.status(201).json({
        message: "user created successfully",
        user
    });
};
exports.AuthNumber = AuthNumber;
const RegisterUser = async (req, res) => {
    try {
        const { phoneNumber, email, password } = req.body;
        if (!phoneNumber || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const ExitUser = await panCardModel_1.default.findOne({
            email
        });
        if (ExitUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await panCardModel_1.default.create({
            phoneNumber,
            email,
            password: hashPassword
        });
        const token = jsonwebtoken_1.default.sign({ user_id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        });
        redis_1.default.set(`userId:${user._id}`, token);
        redis_1.default.set(`token:${token}`, JSON.stringify(user));
        return res.status(201).json({ message: "User created successfully", user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.RegisterUser = RegisterUser;
const LoginUser = (req, res) => {
    res.status(200).json(req.user);
};
exports.LoginUser = LoginUser;
const LogoutUser = (req, res) => {
    res.clearCookie("token");
    const token = req.headers.token;
    if (token) {
        redis_1.default.del(`token:${token}`);
    }
    redis_1.default.del(`userId:${req.user?._id}`);
    return res.status(200).json({ message: "User logged out successfully" });
};
exports.LogoutUser = LogoutUser;
