import { useEffect , useState } from "react";

const API_CART_URL = "http://localhost:8000/api/cart" 


const useApi = (url:string) => {
    const [data , setData] = useState(null);
    const [error , setError] = useState(null);
    const [loading , setLoading] = useState(true);
    useEffect(()=> {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
         fetch(`${API_CART_URL}/${url}`)
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
        })
    } , [])
    return {data,error,loading };
}

export const  cart = async ({}) =>{
    
}