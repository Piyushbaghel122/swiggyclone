import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const api = axios.create({
    baseURL: "http://localhost:8001/api/v1/reastaurnt", 
    headers: {
        "content-type": "applicatoin/json"
    }, 
    withCredentials: true
});


const Document = () => {
    const [loading , setLoading] = useState<boolean>(false);     
    const [error , setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const submitLogo = async () => {
           const response = await api.post("/JObDocument" , {
            
           })
    }
  

    return (
        <>
        <div className="">
        </div>        
        </>
    )
}

export default Document;