/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8001",
    headers: { 
        "content-type": "application/json"
    },
    withCredentials: true
});


export default function DocumentPage(){
    const [loading , setLoading ] = useState<boolean>(false);
    const [error , setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        PanCard: "",
        AadhaarNumber: "",
        IFSC_CODE: "",
        GST_NUMBER: "",
        bankName: "",
        bankAccountNumber: "",
        bankAccountHolderName: ""
      });
  
    const submitVerify = async () => {
        try{
            setLoading(true);
            setError(null);
            const response = await api.post("/api/docment" ,{ ...formData });
            console.log(response.data);
            setError(response.data || "unknown error");
        }
        catch(error: any){
            if (axios.isAxiosError(error)) {
                setError(error.response?.data || "unknown error");
            } else {
                setError("An unexpected error occurred");
            }
        }
        finally{
            setLoading(false);
        }
    }

    return ( 
      <> 
      
      </>
    )

}