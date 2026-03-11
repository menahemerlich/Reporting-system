import { useState, useContext, useRef } from "react"
import { AuthContext } from "../AuthContext"
import { useNavigate } from "react-router-dom"

function NewReportPage() {
    const navigate = useNavigate()
    const [category, setCategory] = useState("")
    const [urgency, setUrgency] = useState("")
    const [message, setMessage] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
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
            setCategory("")
            setUrgency("")
            setMessage("")
            setFile(null)
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
            alert(data.message)
        }
    }

    return (
        <div className="newForm newReport">

            <label>Category</label>
            <input
                value={category}
                onChange={(e) => setCategory(e.target.value)} required />

            <label>Urgency</label>
            <input
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)} required />

            <label>Message</label>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)} required />
            <div className="fileUpload">
                <label htmlFor="fileInput" className="fileLabel">
                    📎 Upload image
                </label>
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    ref={fileInputRef}
                    onChange={handleFile} />
            </div>
            {file ? <p className="fileName">Selected file: {file.name}</p>: <p className="fileName">No file selected</p>}
            <button onClick={submit}>Submit</button>

        </div>
    )
}

export default NewReportPage