"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const panCardModel_1 = __importDefault(require("../models/panCardModel"));
const redis_1 = __importDefault(require("../config/redis"));
const globals_1 = require("@jest/globals");
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("../config/db"));
// Mock ioredis to prevent connection errors during 
const globals_2 = require("@jest/globals");
globals_2.jest.mock("../services/twilio", () => ({
    Client: {
        verify: {
            v2: {
                services: () => ({
                    verifications: {
                        create: () => Promise.resolve({ status: "pending" })
                    }
                })
            }
        }
    }
}));
(0, globals_1.describe)('auth Api Routes', () => {
    let testUser;
    (0, globals_1.beforeAll)(async () => {
        await (0, db_1.default)();
        if (redis_1.default.status !== "ready") {
            await redis_1.default.connect();
        }
        // Seed database with a user so the controller doesn't return 404
        testUser = new panCardModel_1.default({
            panNumber: "verify",
            panCardNumber: "test",
            AadhaarNumber: 123456789012,
            phoneNumber: "+15558675310", // used for twilio
            isVerified: true,
            user: "Test User"
        });
        await testUser.save();
    });
    (0, globals_1.afterAll)(async () => {
        await panCardModel_1.default.deleteOne({ _id: testUser._id });
        await mongoose_1.default.connection.close();
        redis_1.default.quit();
    });
    (0, globals_1.describe)("POST /api/auth/sendOtp", () => {
        (0, globals_1.it)("successfully sends otp", async () => {
            const userData = {
                panCardNumber: "test",
                AadhaarNumber: 123456789012
            };
            const res = await (0, supertest_1.default)(app_1.default)
                .post('/api/auth/sendOtp')
                .send(userData)
                .expect("Content-Type", /json/);
            console.log("Response body:", res.body);
            (0, globals_1.expect)(res.status).toBe(200);
            // Expect only what the controller actually returns
            (0, globals_1.expect)(res.body.message).toBe("OTP sent successfully");
            const cookies = Array.isArray(res.headers['set-cookie'])
                ? res.headers['set-cookie']
                : [res.headers['set-cookie']];
            (0, globals_1.expect)(cookies).toBeDefined();
            (0, globals_1.expect)(cookies.some((cookie) => cookie && cookie.includes('token'))).toBe(true);
            // Verify user in database
            const dbUser = await panCardModel_1.default.findOne({ _id: testUser._id });
            if (!dbUser) {
                throw new Error("User not found in database");
            }
            (0, globals_1.expect)(dbUser).not.toBeNull();
            (0, globals_1.expect)(dbUser).toHaveProperty('AadhaarNumber');
            (0, globals_1.expect)(dbUser).toHaveProperty('panCardNumber');
            (0, globals_1.expect)(dbUser).toHaveProperty('phoneNumber');
            (0, globals_1.expect)(dbUser).toHaveProperty('isVerified');
        }, 15000);
        redis_1.default.set("token", JSON.stringify({
            user: testUser,
            otp: "123456",
            isVarified: true,
        }), "EX", 3600);
    });
});
