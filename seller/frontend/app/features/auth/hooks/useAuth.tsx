/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerUser , loginUser , logoutUser , UserPhone , sendOtp , verifyOtp , restaurantName , restaurantAddress , restaurnatInfo , whatMessageotp , verifyWhatMessageOtp , UserProfile  } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsUser , setIsLoading , setError } from "../authSlice";




export const useAuth = () => {
    const dispatch = useDispatch();
    const { isloading: loading, error, isUser } = useSelector((state: any) => state?.auth || { isloading: false, error: null, isUser: false });
  
    const handleRegistrUser = async ({ username, email, password }: { username: string; email: string; password: string }) => {
        try {
            dispatch(setIsLoading(true));
            const data = await registerUser({ username, email, password });
            if (data) {
                dispatch(setIsUser(true));
            }
            return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            dispatch(setError(error.response?.data?.message || "Registration failed"));
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const handleLoginUaser = async ({email, password}: { email: string , password: string}) =>{
        try{
            dispatch(setIsLoading(true));
            const data = await loginUser({ email, password });
            if (data) {
                dispatch(setIsUser(true));
            }
            return data; 
        }catch(error: any){
            dispatch(setError(error.response?.data?.message || "Login failed"))
        }finally{
            dispatch(setIsLoading(false));
        }
    }

    const handleLogoutUser = async () => {
        try{
            dispatch(setIsLoading(true));
           const data = await logoutUser();
           dispatch(setIsUser(false));
           return data;
        }catch(error: any){
            dispatch(setError(error.response?.data?.message || "Logout failed"))
        }finally{
            dispatch(setIsLoading(false));
        }
    }

    


    

    return { handleRegistrUser , handleLoginUaser , handleLogoutUser, loading, error, isUser };
};
