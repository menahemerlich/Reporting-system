import { useContext, type ReactNode } from "react"
import { AuthContext } from "../AuthContext"
import { Navigate } from "react-router-dom"

function LoginProtected({ children }: { children: ReactNode }) {
  const { token } = useContext(AuthContext)  
  if (!token) return <Navigate to="/login" />

  return children
}
export default LoginProtected