import { useState, useContext } from "react"
import { AuthContext } from "../AuthContext"
import { useNavigate } from "react-router-dom"

function NewReportPage() {
    const navigate = useNavigate()
    const [category, setCategory] = useState("")
    const [urgency, setUrgency] = useState("")
    const [message, setMessage] = useState("")
    const [file, setFile] = useState<File | null>(null)

    const { token, user } = useContext(AuthContext)

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    async function submit() {
        const formData = new FormData()

        formData.append("category", category)
        formData.append("urgency", urgency)
        formData.append("message", message)

        if (file) {
            formData.append("image", file)
        }

        const response = await fetch("http://localhost:3001/reports", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })

        const data = await response.json()
        if (response.ok) {
            alert(`The report was sent successfully. Report id: ${data.id}`)
            navigate(user.role === "admin" ? '/admin/dashboard' : '/dashboard')
        } else {
            alert(data.message)
        }
    }

    return (
        <div>

            <label>Category</label>
            <input onChange={(e) => setCategory(e.target.value)} required />

            <label>Urgency</label>
            <input onChange={(e) => setUrgency(e.target.value)} required />

            <label>Message</label>
            <input onChange={(e) => setMessage(e.target.value)} required />

            <input type="file" name="image" onChange={handleFile} />

            <button onClick={submit}>Submit</button>

        </div>
    )
}

export default NewReportPage