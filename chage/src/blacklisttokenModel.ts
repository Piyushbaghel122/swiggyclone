import mongoose from 'mongoose';
import express, { 
    type Request, 
    type Response, 
    type NextFunction 
} from "express";
import jwt from "jsonwebtoken";

// 1. Blacklist Token Schema Model (TypeScript/Mongoose)
const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in seconds
    }
});

export const BlacklistTokenModel = mongoose.model('BlacklistToken', blacklistTokenSchema);
