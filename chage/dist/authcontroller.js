import { changepasswordModel } from "./changeModel";
import jwt from "jsonwebtoken";
import redis from "./redis";
import mongoose from "mongoose";
export async function changepassword(req, res) {
    try {
        // 1. Get inputs (extract user id/identifier from params, body, or authenticated user request object)
        const { id, newpassword, confirmpassword } = req.body;
        // 2. RUN VALIDATION CHECKS FIRST
        if (!newpassword || !confirmpassword) {
            return res.status(400).json({ success: false, message: "Please provide both new and confirm passwords" });
        }
        // 4. Find and update the existing user document in MongoDB (or create if no id provided during testing)
        let user;
        if (id && mongoose.Types.ObjectId.isValid(id)) {
            user = await changepasswordModel.findByIdAndUpdate(id, { newpassword, confirmpassword }, { returnDocument: "after" });
        }
        else {
            user = await changepasswordModel.create({ newpassword, confirmpassword });
        }
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        // 5. Generate token and set Redis session
        const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "10h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
        await redis.set(`user:${user._id}:token`, token, "EX", 24 * 60 * 60);
        return res.status(200).json({ success: true, message: "Password changed successfully", token, user });
    }
    catch (error) {
        console.error("Change password error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
