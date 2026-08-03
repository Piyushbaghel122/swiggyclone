import { useContext  , useEffect } from "react";
import { ProfileContext } from "../ProfileContext";
import { userprofile } from "../servcies/proflleapi";

export default function useProfile(){

    const {user,setUser ,loading , setLoading} = useContext(ProfileContext);

    async function handleProfile(){
        try {
            setLoading(true);
            const data = await userprofile();
            setUser(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        handleProfile();
    },[])

    return { user, setUser, loading, setLoading  , handleProfile };

}