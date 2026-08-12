import axios from "axios";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { FormConfirm } from "../../../../features/auth/components/FormConfirm";
import { ImageUpload } from "../../../../features/auth/components/ImageUpload";

const api = axios.create({
    baseURL: "http://localhost:8001/api/v1/reastaurant",
    headers: {
        "content-type": "application/json"
    },
    withCredentials: true
});


export const Dashboard = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const fetchMenu = async () => {
        const response = await api.get("/getMe")
    }
 
const ReastaurantLogin = async () => {
    const response =  await api.get("/")
}
    return (
        <>
        <div className="w-full h-screen flex flex-col">
            <div className="w-full px-4 mt-6 flex-1 pb-10">
                <ImageUpload className="w-full h-full flex flex-col" label="Dashboard Banner Image" defaultImage="/boy_making_food.png" />
            </div>
            </div>


        </>
    )

}