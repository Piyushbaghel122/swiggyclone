import { useEffect , useState } from "react";

const BASE_API_AUTH  = "http://localhost:8003/auth"

export function useAPI() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_API_AUTH}`, {
                    method: "GET", // Change to "POST" if needed
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                
                const result = await response.json();
                setData(result);
                console.log(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
                console.log("done");
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
}


export const registerUser = async ({username , email , password , mobile}: {username:string,email:string,password:string,mobile:number}) => {
    const res = await fetch(`${BASE_API_AUTH}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
            mobile,
        }),
    });
    const result = await res.json();
    return result;
}

export const loginUser = async ({ email, password }: {email:string,password:string}) => { 
    const res = await fetch(`${BASE_API_AUTH}/login` , {
        method: "POST", 
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
    const result = await res.json(); 
    return result;
}

export const logoutUser = async () => {
    
}

export const sendOtp = async ({ mobile }: { mobile: number }) => {
    const res = await fetch(`${BASE_API_AUTH}/sendOtp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile }),
    });
    const result = await res.json();
    return result;
}

export const verifyOtp = async ({ mobile, otp }: { mobile: number, otp: number }) => {
    const res = await fetch(`${BASE_API_AUTH}/verifyOtp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, otp }),
    });
    const result = await res.json();
    return result;
}