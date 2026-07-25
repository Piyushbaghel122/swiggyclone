import { useContext } from "react";
import { changePassword } from "./api";
import { AuthContext } from "./contextauth";

export default function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    const { loading, user, setLoading, setUser } = context;

    const handlenewpassword = async (newPassword: string, confirmPassword: string, id?: string) => {
        setLoading(true);
        try {
            const userId = id || user?.id || new URLSearchParams(window.location.search).get("id") || "1";
            const data = await changePassword(newPassword, confirmPassword, userId);
            setUser(data);
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { loading, user, setLoading, setUser, handlenewpassword };
}
