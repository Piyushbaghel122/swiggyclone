import { createContext, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthContext = createContext<any>(null);

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
       const [ user , setUser ] = useState(null);
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       const [ loading , setLoading ] = useState(false);
       // eslint-disable-next-line @typescript-eslint/no-explicit-any

    return (
        <AuthContext.Provider value={{ user , loading , setLoading  , setUser}}>
            {children}
        </AuthContext.Provider>
    )
}