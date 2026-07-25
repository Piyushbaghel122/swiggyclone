/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, type ReactNode } from "react";

export interface AuthContextType {
    loading: boolean;
    user: any;
    setLoading: (loading: boolean) => void;
    setUser: (user: any) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>(null);

    return (
        <AuthContext.Provider value={{ loading, user, setLoading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}
