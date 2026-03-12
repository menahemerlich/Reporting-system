import { useContext, useState } from 'react'
import { AuthContext } from '../AuthContext'
import { useNavigate } from 'react-router-dom'

function CSVUploadPage() {
    const navigate = useNavigate()
    const [file, setFile] = useState<File | null>(null)
    const { token } = useContext(AuthContext)
    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }
    async function submit() {
        const formData = new FormData()
        if (file) {
            formData.append("file", file)
        }

        const response = await fetch("http://localhost:3001/reports/csv", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })

        const data = await response.json()
        console.log(data);

        if (response.ok) {
            alert(`The report was sent successfully. Reports was upload: ${data.importedCount}`)
            navigate('/dashboard')
        } else {
            alert(data.message)
        }
    }
    return (
        <div className="fileUpload newForm csvUpload">
            <label htmlFor="fileInput" className="fileLabel">
                Upload CSV
            </label>

            <input id="fileInput" type="file" name="file" onChange={handleFile} />
            {file ? <p className="fileName">Selected file: {file.name}</p> : <p className="fileName">No file selected</p>}
            <button onClick={submit}>Submit</button>
        </div>
    )
}

export default CSVUploadPage