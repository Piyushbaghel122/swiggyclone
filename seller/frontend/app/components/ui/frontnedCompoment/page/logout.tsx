/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const api = axios.create({
    baseURL: "http://localhost:8001/api/v1/auth",
    headers: {
        "content-type": "application/json"
    },
    withCredentials: true
});

export async function logout() {   
    const [error, setError] = useState<string | null>(null);
    const [loading , setLoading] = useState<boolean>(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

   const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await api.post("/logout");
        console.log(response.data);
        setError(null);
        setLoading(false);
        navigate({
            to: "/"
        })
    } catch (error) {
        console.log(error);
        setError("Logout failed");
        setLoading(false);
    }
   }    

    return (
      <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="shadow-lg bg-white p-8 rounded-lg w-full">
            <form action="" onSubmit={handlesubmit}>
                <button type="submit" disabled={loading} className="w-full bg-amber-300 text-white py-2 rounded-lg hover:bg-amber-500">
                    {loading ? "Logging out..." : "Logout"}
                </button>
                {error && <div className="text-red-500 mt-2">{error}</div>}
            </form>
        </div>

      </div>
       </>
    )


}