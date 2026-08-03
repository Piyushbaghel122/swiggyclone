import { useDispatch } from "react-redux";
import { registerUser, verifyOtp , sendOtp  } from "../servcies/api";
import { setError, setIsLoading, setUser } from "../Authslice";

export const useAuth = () => {
     const dispatch = useDispatch();

    const handleregisterUser = async ({mobile}: {mobile:number}) => {
        dispatch(setIsLoading(true));
        try {
            const data = await registerUser({mobile});
            dispatch(setUser(data));
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            dispatch(setError(err.response?.data?.message || "Register Failed"));
        } finally {
            dispatch(setIsLoading(false));
        }
    }

    const handleSendUser = async ({mobile}: {mobile:number}) => {
        dispatch(setIsLoading(true));
        try{
            const data = await sendOtp ({ mobile });
            dispatch(setUser(data));
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            dispatch(setError(err.response?.data?.message || "send User not successfuly"));
        } finally {
            dispatch(setIsLoading(false))
        }
    }
   const handleVerifyUser = async ({mobile, otp}: {mobile:number, otp:number}) => {
     dispatch(setIsLoading(true))
     try{
        const  data = await verifyOtp({mobile,otp});
        dispatch(setUser(data));
     } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } };
        dispatch(setError(err.response?.data?.message || "verify User not successfuly"));
     } finally {
        dispatch(setIsLoading(false))
     }
   }
      return { handleregisterUser, handleSendUser, handleVerifyUser };
};