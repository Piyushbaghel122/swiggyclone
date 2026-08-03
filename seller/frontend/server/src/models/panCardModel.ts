import db, { Document } from "mongoose";

export interface IAuth extends Document {
    panNumber: "verify" | "disable";
    panCardNumber?: string;
    AadhaarNumber?: number;
    otp?: string;
    isVerified: boolean;
    phoneNumber?: string;
    fssaiLicense?: string;
    gstNumber?: string;
    location?: {
        lat: number;
        lng: number;
    };
    email?: string;
    password?: string;
}


const authSchema = new db.Schema<IAuth>({
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

const AuthModel = db.model<IAuth>("Auth" , authSchema);

export default AuthModel;