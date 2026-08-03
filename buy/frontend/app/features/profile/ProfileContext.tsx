import { createContext, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProfileContext = createContext<any>(null);

export default function ProfileContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    return (
        <ProfileContext.Provider value={{ user, loading, setLoading, setUser }}>
            {children}
        </ProfileContext.Provider>
    );
}