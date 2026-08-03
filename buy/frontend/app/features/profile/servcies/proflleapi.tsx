import { useEffect , useState } from "react"

const API_BASE_URL = "http://localhost:8000/user";

export const useProfileInfo = (url: string) => {
   
    const [ loading , setLoading ] = useState(true);
    const [ data , setData ] = useState(null);
    const [ error , setError ] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        fetch(`${API_BASE_URL}/${url}`, {
            credentials: "include"
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch profile");
            return res.json();
        })
        .then(data => {
            console.log(data);
            setData(data);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
            setError(error);
            setLoading(false);
        })
    }, [url])

    return { data , error , loading }
}


export const userprofile = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/profile`, {
            method: "GET",
            credentials: "include"
        });
        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Failed to fetch profile:", error);
        throw error;
    }
}

