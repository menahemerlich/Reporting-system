import { useContext } from "react"
import { AuthContext } from "../AuthContext"
import { useNavigate } from "react-router-dom"

function Header() {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    return (
        <div>
            <h1>User logged in: {user?.fullName}</h1>
            <h1>User permissions: {user?.role}</h1>
            <button onClick={logout}>Logout</button>
            <button onClick={() => {
                if (user?.role === "admin") {
                    navigate("/admin/dashboard")
                } else {
                    navigate("/dashboard")
                }
            }}>Home Page</button>
        </div>
    )
}

export default Header