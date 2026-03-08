import { createContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>("")
    const [user, setUser] = useState<object|null>(null)

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if (storedToken) {
            setToken(storedToken)
        }
    }, [])
    return (
        <AuthContext value={{ token, setToken, user, setUser }}>
            {children}
        </AuthContext>
    )
}
export { AuthContext }