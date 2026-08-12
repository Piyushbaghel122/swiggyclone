import axios from "axios";
import { useState } from "react";

const api = axios.create({
    baseURL: "http://localhost:8001/api/v1/reastaurant",
    headers:{
        "content-type": "application/json"
    },
    withCredentials: true
});


export default function MyReastaurantDashboard(){
       const [loading , setLoading] = useState<boolean>(false);
       const [error , setError] = useState<string | null>(null); 
       const [ReastaurantName , setReastaurant] = useState();
       const [ReastaurantLocation , setReastaurantLocation] = useState();
       const [ReastaurantPincode , setReastaurantPincode] = useState();
       const [ReastaurantImage , ReastaurantImage] = useState()
   
       const 
       const response = await api.get("/getReastaurant", { ReastaurantName , ReastaurantLocation});  
       console.log(response.data)



    return (
        <>
        <div className="mx-auto flex border border-gray-400 w-full h-[200px] flex-cols">
            
        </div>
        
        </>
    )
}