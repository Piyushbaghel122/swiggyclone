import { RegisterUser, LoginUser, LogoutUser, sendLinkUser } from "../services/api";
import { AuthContext } from "../contextAuth";
import { useContext } from "react";


export default function useAuth() {  

      const context = useContext(AuthContext);

       const {setUser, user , loading , setLoading } = context;

const handleRegisterUser = async ({email,password,username,mobile}: {email: string,password: string,username: string,mobile: string}) => {
    setLoading(true);
    const data = await RegisterUser({email,password,username,mobile});
    console.log(data);
    setUser(data.user || { id: data.user_id, email, username, mobile });
    setLoading(false);
    return data;
}


 const handleLoginUser = async ({email,password}: {email: string,password: string}) => {
    setLoading(true);
    const data = await LoginUser({email,password});
    console.log(data);
    setUser(data.user || { id: data.user_id, email });
    setLoading(false);
    return data;
}
const handleLogoutUser = async () => {
    setLoading(true);
    const data = await LogoutUser();
    console.log(data);
    setUser(data.user);
    setLoading(false);
    return data;
}

const handleSendLinkUser = async ({email}: {email: string}) => {
    setLoading(true);
    const data = await sendLinkUser({email});
    console.log(data);
    setLoading(false);
    return data;
}


return {
    user,
    loading,
    handleLoginUser,
    handleRegisterUser,
    handleLogoutUser,
    handleSendLinkUser
}
}

