import request from "supertest";
import app from "../app";
import AuthModel from "../models/panCardModel";
import redis from "../config/redis";
import { describe, it, expect, afterAll, beforeAll, afterEach } from "@jest/globals";
import mongoose from "mongoose";
import ConnectDB from "../config/db";

// Mock ioredis to prevent connection errors during 
import { jest } from "@jest/globals";

jest.mock("../services/twilio", () => ({
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

describe('auth Api Routes', () => {
   let testUser: any;

   beforeAll(async () => {
     await ConnectDB();
     if(redis.status !== "ready") {
       await redis.connect();
     }
     
     // Seed database with a user so the controller doesn't return 404
     testUser = new AuthModel({
         panNumber: "verify",
         panCardNumber: "test",
         AadhaarNumber: 123456789012,
         phoneNumber: "+15558675310", // used for twilio
         isVerified: true,
         user: "Test User"
     });
     await testUser.save();
   });

   afterAll(async () => {
     await AuthModel.deleteOne({_id: testUser._id});
     await mongoose.connection.close();
     redis.quit();
   });
   describe("POST /api/auth/sendOtp", () => {
     it("successfully sends otp", async () => {
       const userData = { 
           panCardNumber: "test",
           AadhaarNumber: 123456789012
       };
       
       const res = await request(app)
         .post('/api/auth/sendOtp')
         .send(userData)
         .expect("Content-Type", /json/);

       console.log("Response body:", res.body);
       expect(res.status).toBe(200);

       // Expect only what the controller actually returns
       expect(res.body.message).toBe("OTP sent successfully");
     
       const cookies = Array.isArray(res.headers['set-cookie']) 
         ? res.headers['set-cookie'] 
         : [res.headers['set-cookie']];
         
       expect(cookies).toBeDefined();
       expect(cookies.some((cookie: string | undefined) => cookie && cookie.includes('token'))).toBe(true);

       // Verify user in database
       const dbUser = await AuthModel.findOne({ _id: testUser._id });
       if(!dbUser){
         throw new Error("User not found in database");
       }
       expect(dbUser).not.toBeNull();
       expect(dbUser).toHaveProperty('AadhaarNumber');
       expect(dbUser).toHaveProperty('panCardNumber');
       expect(dbUser).toHaveProperty('phoneNumber');
       expect(dbUser).toHaveProperty('isVerified');
     }, 15000);
        
    redis.set("token", JSON.stringify({
        user: testUser,
        otp: "123456",
        isVarified: true,
     }), "EX", 3600);
   });
});
