import { useContext } from "react"
import { AuthContext } from "../AuthContext"
import { Navigate, Outlet } from "react-router-dom"

function AdminProtected() {
    const { user } = useContext(AuthContext);
    if (!user || user.role !== "admin") return <Navigate to="/dashboard" />;

    return <Outlet />
}
export default AdminProtected