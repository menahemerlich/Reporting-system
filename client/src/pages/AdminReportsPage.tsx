import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../AuthContext'

function AdminReportsPage() {
    const [agentId, setAgentId] = useState("")
    const [category, setCategory] = useState("")
    const [urgency, setUrgency] = useState("")
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

        if (agentId) params.append("agentId", agentId)
        if (category) params.append("category", category)
        if (urgency) params.append("urgency", urgency)

        const response = await fetch(
            `http://localhost:3001/reports?${params.toString()}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        const result = await response.json()
        console.log(result);
        
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
    }, [agentId, category, urgency, token])
    return (
        <div>
            <label>Agent ID</label>
            <input onChange={(e) => setAgentId(e.target.value)} />
            <label>Category</label>
            <input onChange={(e) => setCategory(e.target.value)} />
            <label>Urgency</label>
            <input onChange={(e) => setUrgency(e.target.value)} />

            {data.length > 0 && (
                <table>
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
                                <td><img src={`http://localhost:3001/${item.imagePath}`} alt="" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default AdminReportsPage