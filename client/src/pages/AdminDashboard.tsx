import { useNavigate } from "react-router-dom"
function AdminDashboard() {
  const navigate = useNavigate()
  return (
    <div className="dashboard">
        <button onClick={() => navigate('/admin/agents')}>Agent Management</button>
        <button onClick={() => navigate('/admin/reports')}>Reports</button>
    </div>
  )
}

export default AdminDashboard