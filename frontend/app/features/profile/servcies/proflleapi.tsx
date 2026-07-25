import { useEffect , useState } from "react"

const API_BASE_URL = "http://localhost:8000/profile";

export const useProfileInfo = (url: string) => {
   
    const [ loading , setLoading ] = useState(false);
    const [ data , setData ] = useState(null);
    const [ error , setError ] = useState(false);

    useEffect(() => {
        setLoading(false);
        fetch(`${API_BASE_URL}/${url}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setData(data);
            setLoading(true);
        })
        .catch(error => {
            console.log(error);
            setError(error);
            setLoading(true);
        })
    },[url])

    return { data , error , loading }
}


