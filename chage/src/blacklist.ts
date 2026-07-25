import { type Request, type Response } from "express";
import Redis from "ioredis";
import { BlacklistTokenModel } from "./blacklisttokenModel";

const redis = new Redis("redis://localhost:6379");

export async function addblacklist(reqOrToken: Request | string, res?: Response) {
    try {
        let token: string | undefined;

        if (typeof reqOrToken === "string") {
            token = reqOrToken;
        } else {
            token = reqOrToken.cookies?.token || reqOrToken.headers.authorization?.split(" ")[1] || reqOrToken.body?.token;
        }

        if (!token) {
            if (res) {
                return res.status(400).json({ success: false, message: "No token provided to blacklist" });
            }
            throw new Error("No token provided to blacklist");
        }

        // Add to Redis with a 24-hour expiration
        await redis.set(`blacklist:${token}`, "true", "EX", 24 * 60 * 60);

        // Add to MongoDB via Mongoose if not already present
        const exists = await BlacklistTokenModel.findOne({ token });
        if (!exists) {
            await BlacklistTokenModel.create({ token });
        }

        if (res) {
            res.clearCookie("token");
            return res.status(200).json({ success: true, message: "Token added to blacklist successfully" });
        }

        return true;
    } catch (error) {
        console.error("Error adding to blacklist:", error);
        if (res) {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
        throw error;
    }
}

export async function isBlacklisted(token: string): Promise<boolean> {
    const redisCheck = await redis.get(`blacklist:${token}`);
    if (redisCheck === "true") return true;

    const dbCheck = await BlacklistTokenModel.findOne({ token });
    if (dbCheck) {
        await redis.set(`blacklist:${token}`, "true", "EX", 24 * 60 * 60);
        return true;
    }

    return false;
}

export default redis;
