import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../AuthContext'
import { useNavigate } from 'react-router-dom'

function AdminReportsPage() {
    const navigate = useNavigate()
    const [agentId, setAgentId] = useState("")
    const [category, setCategory] = useState("")
    const [urgency, setUrgency] = useState("")
    const [reportId, setReportId] = useState("")
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
        setData(result)
    }
    async function fetchReportById() {
        if (!reportId) return
        const response = await fetch(
            `http://localhost:3001/reports/${reportId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        const result = await response.json()
        if (response.ok) {
            setData(result ? [result] : [])
        } else {
            setData([])
        }
    }

    useEffect(() => {
        if (!token) return
        if (reportId) return
        if (data.length === 0) {
            fetchReports()
            return
        }
        const timer = setTimeout(() => {
            fetchReports()
        }, 1000)
        return () => clearTimeout(timer)
    }, [reportId, agentId, category, urgency, token])
    useEffect(() => {
        fetchReportById()
    }, [reportId])

    return (
        <div id='reports'>
            <div className="dashboard">
                <button onClick={() => navigate('/dashboard/new-report')}>New Report</button>
                <button onClick={() => navigate('/dashboard/csv-upload')}>CSV Upload</button>
            </div>
            <div className="search">
                <div>
                    <h3>Search by: </h3>
                </div>
                <div>
                    <label>Agent ID: </label>
                    <input onChange={(e) => setAgentId(e.target.value)} />
                    <label>Category: </label>
                    <input onChange={(e) => setCategory(e.target.value)} />
                    <label>Urgency: </label>
                    <input onChange={(e) => setUrgency(e.target.value)} />
                </div>
                <div>
                    <label>Report ID: </label>
                    <input onChange={(e) => setReportId(e.target.value)} />
                </div>
            </div>

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
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.userId}</td>
                                <td>{item.category}</td>
                                <td>{item.urgency}</td>
                                <td>{item.message}</td>
                                <td>{item.sourceType}</td>
                                <td>{item.createdAt}</td>
                                <td>{item.imagePath != null ? <img src={`http://localhost:3001/${item.imagePath}`} alt="" /> : null}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (<p>No reports found.</p>)}
        </div>
    )
}

export default AdminReportsPage