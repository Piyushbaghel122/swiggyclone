/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const API_BASE_URL = "http://localhost:8002/auth";

export interface AuthResponse {
  message?: string;
  token?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
  [key: string]: any;
}

export const useAuthApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AuthResponse | null>(null);

  const request = async (
    endpoint: string,
    method: string = "POST",
    body?: any,
    token?: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || result.message || "An error occurred during request");
      }

      setData(result);
      return { success: true, data: result };
    } catch (err: any) {
      const errorMessage = err.message || "Something went wrong";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };
  const login = async ({ email, password }: { email: string; password: string }) => {
    return await request("/login", "POST", { email, password });
  };

  const register = async (body: any) => {
    return await request("/register", "POST", body);
  };

  const sendOtp = async ({ email }: { email: string }) => {
    return await request("/send-otp", "POST", { email });
  };

  return {
    loading,
    setLoading,
    error,
    setError,
    data,
    login,
    register,
    sendOtp,
  };
};

export const registerUser = async ({username , email , password}: {username: string,email: string,password: string}) => {
    const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.detail || data.message || "Registration failed");
    }
    return data;
};

export const loginUser = async ({email , password}: {email: string , password: string}) => {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || data.message || "Login failed");
  }
  return data;
};


export const logoutUser = async () => {
    const res = await fetch(`${API_BASE_URL}/logout`, { 
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.detail || data.message || "Logout failed");
    }
    return data;
};

export const UserPhone = async ({ phone, message }: { phone: string, message: string }) => {
    const res = await fetch(`${API_BASE_URL}/phone`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            phone,
            message,
        }),
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.detail || data.message || "Failed to submit phone data");
    }
    return data;
};

export const sendOtp = async ({ to, message }: { to: string; message: number | string }) => {
    const res = await fetch(`${API_BASE_URL}/send-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            to,
            message,
        }),
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.detail || data.message || "Failed to send OTP");
    }
    return data;
};

export const verifyOtp = async ({ otp, to }: { otp: string; to?: string }) => {
    const res = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            otp,
            to,
        }),
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.detail || data.message || "Failed to verify OTP");
    }
    return data;
};

export const restaurantName = async ({name}: { name: string }) => {
    const res = await fetch(`${API_BASE_URL}/restaurantname`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
        }),
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.detail || data.message || "Failed to set restaurant name");
    }
    return data;
}

export const restaurantAddress = async ({address}: { address: string }) => {
    const res = await fetch(`${API_BASE_URL}/restaurantaddress`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            address,
        }),
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.detail || data.message || "Failed to set restaurant address");
    }
    return data;
}

export const restaurnatInfo = async ({owername, restaurantname , restaurnataddress , email , mobile }: {owername: string , restaurantname:string , restaurnataddress:string , email:string , mobile:number}) => {
   const res = await fetch(`${API_BASE_URL}/restaurantinfo`,{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        owername,
        restaurantname,
        restaurnataddress,
        email,
        mobile,
    }),
   });
   const data = await res.json();
   if (!res.ok) {
    throw new Error(data.detail || data.message || "Failed to set restaurant info");
   }
   return data;
}

export const whatMessageotp  = async ({ phone , message}: {phone:string ,message:string}) => {
   const res = await fetch(`${API_BASE_URL}/whatmessageotp`,{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        phone,
        message,
    }),
   });
   const data = await res.json();
   if (!res.ok) {
    throw new Error(data.detail || data.message || "Failed to set message");
   }
   return data;
}

export const verifyWhatMessageOtp = async ({otp}: {otp:string}) => {
   const res = await fetch(`${API_BASE_URL}/verify-whatmessageotp`,{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        otp,
    }),
   });
   const data = await res.json();
   if (!res.ok) {
    throw new Error(data.detail || data.message || "Failed to verify OTP");
   }
   return data;
}



export const UserProfile = async ({username , lastname , address , phone  , image , location}: {username: string, lastname: string , address: string , phone: string ,location: string , image: string}) => {
  const res = await fetch(`${API_BASE_URL}/userprofile`, {
    method: "GET",
    headers: {
        "context-type": "application/json",
    }, 
    body: JSON.stringify({
      username,
      lastname,
      address,
      phone,
      location,
      image,
    }),
  })
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || data.message || "Failed to set user profile");
  }
  return data;    
}

