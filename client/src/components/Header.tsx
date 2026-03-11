import { useContext } from "react"
import { AuthContext } from "../AuthContext"
import { useNavigate } from "react-router-dom"
import { TbLogout2 } from "react-icons/tb";

function Header() {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    return (
        <div className="navbar">
            <div>
                <p>User logged in: <b>{user?.fullName}</b></p>
                <p>User permissions: <b>{user?.role}</b></p>
            </div>
            <div className="navButtons">
                <div className="cover">
                    <button onClick={() => {
                        if (user?.role === "admin") {
                            navigate("/admin/dashboard")
                        } else {
                            navigate("/dashboard")
                        }
                    }}>Home</button>
                </div>
                <div className="cover logout">
                    <button id="logout" onClick={logout}><TbLogout2 className='logoutIcon' /></button>
                </div>
            </div>
        </div>
    )
}

export default Header