import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8000/api/auth";

export const useApi = (url: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        fetch(`${API_BASE_URL}/${url}`)      
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError(err);
                setLoading(false);
            });
    }, [url]);

    return { data, error, loading };
}

export const RegisterUser = async ({email,password,username,mobile}: {email: string,password: string,username: string,mobile: string}) => {
    const res = await fetch(`${API_BASE_URL}/register` , {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email , password , username, mobile })
    });
    const data = await res.json();
    if (!res.ok) {
        const errorMsg = typeof data.detail === 'string' ? data.detail : (Array.isArray(data.detail) ? `${data.detail[0]?.loc?.[1] || 'field'}: ${data.detail[0]?.msg}` : "Registration failed");
        throw new Error(errorMsg);
    }
    console.log(data);
    return data;
}

export const LoginUser = async ({email,password}: {email: string,password: string}) => {
    const res = await fetch(`${API_BASE_URL}/login` , {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email , password })
    });
    const data = await res.json();
    if (!res.ok) {
        const errorMsg = typeof data.detail === 'string' ? data.detail : (Array.isArray(data.detail) ? `${data.detail[0]?.loc?.[1] || 'field'}: ${data.detail[0]?.msg}` : "Login failed");
        throw new Error(errorMsg);
    }
    console.log(data);
    return data;
}

export const LogoutUser = async () => {
    const res = await fetch(`${API_BASE_URL}/logout` , {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    console.log(data);
    return data;
}

export const sendLinkUser = async ({email }: {email: string }) => {
    const res = await fetch(`${API_BASE_URL}/sendlink` , {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email })
    });
    const data = await res.json();
    console.log(data);
    return data;
}

export const changePasword = async ({ newPasword , confirmPassword}: {newPasword: string,confirmPassword: string}) => {
    const res = await fetch(`${API_BASE_URL}/reset-password` , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPasword , confirmPassword })
    });
    const data = await res.json();
    console.log(data);
    return data;
}

export const sendOtp = async ({otp , verifyButton , resendOtp }: {otp: string , verifyButton: boolean , resendOtp: string , setEmail: string}) => {
    const res = await fetch(`${API_BASE_URL}/verify-otp` , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp , verifyButton , resendOtp  })
    });
    const data = await res.json();
    console.log(data);
    return data;
}

export const resendOtp = async ({ resendOtp }: {resendOtp: string}) => {
    const res = await fetch(`${API_BASE_URL}/resend-otp` , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ resendOtp})
    });
    const data = await res.json();
    console.log(data);
    return data;
}

export const verifyOtp = async () => {
    const res = await fetch(`${API_BASE_URL}/verifyOtp` , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    console.log(data);
    return data;
}

