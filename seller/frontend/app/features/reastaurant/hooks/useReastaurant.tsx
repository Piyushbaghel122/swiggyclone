import axios from "axios";
import { useState } from "react";

const api = axios.create({
    baseURL: "http://localhost:8001/api/v1/reastaurant",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});


export default function useReastaurant() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const createReastaurant = async ({ reastaurantNameOwner, reastaurantName, reastaurantDescription, reastaurantImage, reastaurantLocation, reastaurantPincode, reastaurantAddress, reastaurantMobileNumber, reastaurantType }: any) => {
        try {
            setLoading(true);
            const response = await api.post("/createreastaurant", {
                reastaurantNameOwner,
                reastaurantName,
                reastaurantDescription,
                reastaurantImage,
                reastaurantLocation,
                reastaurantPincode,
                reastaurantAddress,
                reastaurantMobileNumber,
                reastaurantType,
            });
            setLoading(false);
            return response.data;
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError("Failed to create reastaurant");
        }
    };

    const WorkWeek = async ({ sunday , monday , tuesday , wednesday , thursday , friday , saturday , }: any) => {
        try {
            setLoading(true);
            const response = await api.put("/workweeklyschudle", {
                sunday ,
                monday ,
                tuesday ,
                wednesday ,
                thursday ,
                friday ,
                saturday ,
            });
            setLoading(false);
            return response.data;
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError("Failed to update reastaurant");
        }
    };

    const CloseAndOpen = async ({close , open}: any) => {
        try {
            setLoading(true);
            const response = await api.post("/shopopenandclose", {
                close,
                open
            });
            setLoading(false);
            return response.data;
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError("Failed to close and open reastaurant");
        }
    }

}