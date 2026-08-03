import { type Request, type Response } from "express";
import AuthModel from "../models/panCardModel";
import { Client } from "../services/twilio";
import jwt from "jsonwebtoken";
import redis from "../config/redis";
import bcrypt from "bcryptjs";


export async function CreateVPA(req: Request, res: Response) {
    try{
        const { panCardNumber } = req.body;
        let user = await AuthModel.findOne({
            panCardNumber
        });
        if(user){
            return res.status(200).json({message:"User already exists", user}) 
        }
        
        user = new AuthModel({
            panCardNumber,
            panNumber: "verify"
        });
        await user.save();
        return res.status(201).json({message: "User created successfully", user});
    }
    catch(error:any){
        res.status(500).json({message:error.message})
    }
}


export const AadhaarNumber = async (req: Request, res: Response) =>{
    try {
        const { AadhaarNumber, panCardNumber } = req.body;

        if(String(AadhaarNumber).length !== 12){
            return res.status(400).json({message:"Invalid Aadhaar Number"})
        }

        let user = await AuthModel.findOne({ panCardNumber });

        if(user){
            user.AadhaarNumber = AadhaarNumber;
            await user.save();
            return res.status(200).json({message:"Aadhaar updated successfully", user});
        }
        
        // If no panCardNumber was provided, or user not found, create a new one
        user = new AuthModel({
            AadhaarNumber,
            panCardNumber,
            panNumber: "verify"
        });
        await user.save();
        return res.status(201).json({message:"User created with Aadhaar", user});
    } catch(error:any){
        res.status(500).json({message:error.message})
    }
}


export const sendOtp = async (req: Request , res:Response) => {
  try{
    const { AadhaarNumber , panCardNumber, phoneNumber } = req.body; 

   if(!panCardNumber){
    return res.status(400).json({message:"panCardNumber is required"})
   }
    
 let user = await AuthModel.findOne({ panCardNumber });

 if(!user){
    // Create the user if they do not exist
    user = new AuthModel({
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
 
 if(!user.isVerified){
    // You might want to allow sending OTP even if not verified, as OTP is usually FOR verification.
    // Commenting out the restriction so they can actually verify.
    // return res.status(401).json({message:"User not verified"})
 }
  
  // Generate a random 6-digit OTP
  const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Save OTP to user document
  user.otp = generatedOtp;
  await user.save();

  let token = jwt.sign({user_id:user._id}, process.env.JWT_SECRET as string , {expiresIn:"1h"});
  
  res.cookie("token",token,{
     httpOnly:true,
     secure:true,
     sameSite:"strict",
     maxAge:60*60*1000 
  });
  
  // Return the OTP in the response so the user can see it without SMS
  res.status(200).json({message:"OTP sent successfully", otp: generatedOtp});
  } catch(error:any) {
      res.status(500).json({message: error.message});
  }
}

export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const { otp, panCardNumber } = req.body;
        
        if (!otp || !panCardNumber) {
            return res.status(400).json({ message: "OTP and panCardNumber are required" });
        }

        const user = await AuthModel.findOne({ panCardNumber });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.otp === String(otp)) {
            user.isVerified = true;
            await user.save();
            return res.status(200).json({ message: "OTP verified successfully" });
        } else {
            return res.status(400).json({ message: "Invalid OTP" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const UpdateFssai = async (req: Request, res: Response) => {
    try {
        const { fssaiLicense, panCardNumber } = req.body;
        
        if (!fssaiLicense || !panCardNumber) {
            return res.status(400).json({ message: "fssaiLicense and panCardNumber are required" });
        }

        const user = await AuthModel.findOne({ panCardNumber });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.fssaiLicense = fssaiLicense;
        await user.save();
        return res.status(200).json({ message: "FSSAI License updated successfully", user });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const UpdateGst = async (req: Request, res: Response) => {
    try {
        const { gstNumber, panCardNumber } = req.body;
        
        if (!gstNumber || !panCardNumber) {
            return res.status(400).json({ message: "gstNumber and panCardNumber are required" });
        }

        const user = await AuthModel.findOne({ panCardNumber });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.gstNumber = gstNumber;
        await user.save();
        return res.status(200).json({ message: "GST Number updated successfully", user });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const AuthNumber = async (req:Request, res:Response) => {
   const { phoneNumber  } = req.body;
  
   let user = await AuthModel.findOne({phoneNumber})
   
   if(user){
    return res.status(200).json({
        message: "User logged in successfully",
        user
    });
   }
   
   // If user does not exist, create a new one
   user = await AuthModel.create({
    phoneNumber
   });
   
   return res.status(201).json({
       message:"user created successfully",
       user
   });
}

export const RegisterUser = async (req:Request , res:Response ) => {
    try{
      const {phoneNumber , email , password} = req.body;

      if(!phoneNumber || !email || !password ){
        return res.status(400).json({message:"All fields are required"});
      }
      
      const ExitUser = await AuthModel.findOne({
        email
      });

      if(ExitUser){
        return res.status(400).json({message:"User already exists"});
      }
      
      const hashPassword = await bcrypt.hash(password, 10);
      
      const user = await AuthModel.create({
        phoneNumber , 
        email,
        password:hashPassword
      });

      const token = jwt.sign({user_id:user._id}, process.env.JWT_SECRET as string , {expiresIn:"1h"});

      res.cookie("token",token,{
         httpOnly:true,
         secure:true,
         sameSite:"strict",
         maxAge:60*60*1000 
      });

      redis.set(`userId:${user._id}`, token)
      redis.set(`token:${token}`, JSON.stringify(user));
      
      return res.status(201).json({message:"User created successfully", user});
    } catch(error:any){
      res.status(500).json({message:error.message});
    }
}

export const LoginUser = (req:Request , res: Response) => {
    res.status(200).json((req as any).user);
};

export const LogoutUser = (req:Request , res: Response) => {    
      
    res.clearCookie("token");
    
    const token = req.headers.token;
    if(token){
        redis.del(`token:${token}`);
    }
    redis.del(`userId:${(req as any).user?._id}`);
    return res.status(200).json({message:"User logged out successfully"});
}


