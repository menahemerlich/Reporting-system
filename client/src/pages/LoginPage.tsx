import { useContext, useState } from 'react'
import { AuthContext } from '../AuthContext'
import { useNavigate } from "react-router-dom"

function LoginPage() {
    const [agentCode, setAgentCode] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { setToken, setUser } = useContext(AuthContext)
    const navigate = useNavigate()
    async function submit() {
        try {
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    agentCode,
                    password
                })
            })
            const data = await response.json()
            if (response.ok) {
                localStorage.setItem("token", data.token)
                setToken(data.token)
                setUser(data.user)
                navigate('/dashboard')
            } else {
                alert(data.message + '. Try agein!')
            }

        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <label htmlFor="">Agent Code</label>
            <input type="text" placeholder='Agent Code...' onChange={(e) => setAgentCode(e.target.value)} />

            <label htmlFor="">Password</label>
            <input type="password" placeholder='Password...' onChange={(e) => setPassword(e.target.value)} />

            <button onClick={() => submit()}>Submit</button>
        </div>
    )
}

export default LoginPage