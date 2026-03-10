import { useContext } from "react"
import { AuthContext } from "../AuthContext"
import { useNavigate } from "react-router-dom"

function Header() {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    return (
        <div className="navbar">
            <div>
                <p>User logged in: {user?.fullName}</p>
                <p>User permissions: {user?.role}</p>
            </div>
            <div>
                <button onClick={logout}>Logout</button>
                <button onClick={() => {
                    if (user?.role === "admin") {
                        navigate("/admin/dashboard")
                    } else {
                        navigate("/dashboard")
                    }
                }}>Home Page</button>
            </div>
        </div>
    )
}

export default Header