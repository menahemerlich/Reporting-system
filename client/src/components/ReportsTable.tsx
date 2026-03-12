import { useContext } from "react"
import { AuthContext } from "../AuthContext"
import type { Report } from "../types/Report"

function ReportsTable() {
    const { data } = useContext(AuthContext)
    return (
        <>
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
                        {data.map((item: Report) => (
                            <tr key={item.id}>
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
            ) : (<p>No reports found.</p>)
            }
        </>
    )
}

export default ReportsTable