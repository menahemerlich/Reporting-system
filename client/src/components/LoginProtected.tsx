import { useContext } from "react"
import { AuthContext } from "../AuthContext"
import { Navigate, Outlet } from "react-router-dom"

function LoginProtected() {
    const { token, user } = useContext(AuthContext);
    if (!token || !user) return <Navigate to="/login" />;

    return <Outlet />
}
export default LoginProtected