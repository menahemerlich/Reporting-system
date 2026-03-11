import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../AuthContext'

function MyReportsPage() {
    const [category, setCategory] = useState("")
    const [urgency, setUrgency] = useState("")
    const [message, setMessage] = useState("")
    const [data, setData] = useState<Array<{
        id: string;
        userId: string
        message: string
        category: string
        urgency: string
        sourceType: string
        createdAt: string
        imagePath: string
    }>>([])
    const { token } = useContext(AuthContext)

    async function fetchReports() {
        const params = new URLSearchParams()

        if (category) params.append("category", category)
        if (urgency) params.append("urgency", urgency)
        if (message) params.append("message", message)

        const response = await fetch(
            `http://localhost:3001/reports?${params.toString()}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        const result = await response.json()
        setData(result)
    }

    useEffect(() => {
        if (!token) return
        if (data.length === 0) {
            fetchReports()
            return
        }
        const timer = setTimeout(() => {
            fetchReports()
        }, 1000)
        return () => clearTimeout(timer)
    }, [category, urgency, message, token])
    return (
        <div>
            <label>Category</label>
            <input onChange={(e) => setCategory(e.target.value)} />

            <label>Urgency</label>
            <input onChange={(e) => setUrgency(e.target.value)} />

            <label>Message</label>
            <input onChange={(e) => setMessage(e.target.value)} />
            {data.length > 0 ? (
                <table className='Table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Category</th>
                            <th>Urgency</th>
                            <th>Message</th>
                            <th>Source</th>
                            <th>Created</th>
                            <th>Image</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.userId}</td>
                                <td>{item.category}</td>
                                <td>{item.urgency}</td>
                                <td>{item.message}</td>
                                <td>{item.sourceType}</td>
                                <td>{item.createdAt}</td>
                                <td>{item.imagePath != null?<img src={`http://localhost:3001/${item.imagePath}`} alt="" />:null}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ):<div>No reports found</div>}
        </div>
    )
}

export default MyReportsPage