/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8003/api/auth",
    headers: {
      "CLIENT-API": "IMBGGYVE9ZSIWKVTC13NBW2NX",
      "CLIENT_SECRET_API": "imb_prod_juq0r4agxwdzevmdj1dxtjik46q2ol9e",
      "MERCHANT_API": "IMBPY00515"
    }, 
    withCredentials: true
});


export const sendOtp = async ({panCardNumber , AadhaarNumber, phoneNumber}: {panCardNumber: string, AadhaarNumber?: string, phoneNumber: string}) => {
  try{
    const response = await api.post("/sendOtp" , {
      panCardNumber: panCardNumber,
      AadhaarNumber: AadhaarNumber,
      phoneNumber: phoneNumber
    });
    return response.data;
  }catch(error:any){
    return error.message;
  }
}

export const updateFssai = async ({panCardNumber, fssaiLicense}: {panCardNumber: string, fssaiLicense: string}) => {
  try {
    const response = await api.post("/fssai", {
      panCardNumber,
      fssaiLicense
    });
    return response.data;
  } catch(error:any) {
    return error.message;
  }
}

export const updateGst = async ({panCardNumber, gstNumber}: {panCardNumber: string, gstNumber: string}) => {
  try {
    const response = await api.post("/gst", {
      panCardNumber,
      gstNumber
    });
    return response.data;
  } catch(error:any) {
    return error.message;
  }
}

export const panCardAPI = async (panCardNumber: string) => {
  try {
    const response = await api.post("/pancard", {
      panCardNumber
    });
    return response.data;
  } catch(error:any) {
    return error.message;
  }
}

export const aadhaarAPI = async (panCardNumber: string, AadhaarNumber: number) => {
  try {
    const response = await api.post("/address", {
      panCardNumber,
      AadhaarNumber
    });
    return response.data;
  } catch(error:any) {
    return error.message;
  }
}

export const registerUser = async ({email , password , phoneNumber}: {email: string, password: string, phoneNumber: string}) => {
     try{
       const response = await api.post("/register",{
        email: email,
        password: password,
        phoneNumber: phoneNumber
       });
       return response.data;
     }catch(error: any){
      return error.message;
     }
}

export const loginUser = async () => {
    try{
      const response = await api.get("/login");
      return response.data;
    }catch(error:any){
      return error.message;
    }
}

export const logoutUser = async () => {
  try{
    const response = await api.post("/logout");
    return response.data; 
  } catch (error: any) {
    console.error("Logout error:", error);
    return error?.message || "An error occurred";
  }
}