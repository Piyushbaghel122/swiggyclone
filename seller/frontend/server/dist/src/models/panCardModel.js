"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const authSchema = new mongoose_1.default.Schema({
    panNumber: {
        type: String,
        enum: ["verify", "disable"],
        required: true,
        index: true
    },
    panCardNumber: {
        type: String,
    },
    AadhaarNumber: {
        type: Number,
    },
    otp: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    phoneNumber: {
        type: String,
    },
    fssaiLicense: {
        type: String,
    },
    gstNumber: {
        type: String,
    },
    location: {
        lat: { type: Number },
        lng: { type: Number }
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
});
const AuthModel = mongoose_1.default.model("Auth", authSchema);
exports.default = AuthModel;
