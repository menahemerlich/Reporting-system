import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Report } from "./types/Report";

const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate()
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [user, setUser] = useState<null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [data, setData] = useState<Report[]>([])

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const logout = () => {
        setToken(null);
        setUser(null);
        setData([])
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, logout, data, setData }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext };