import { useNavigate } from "react-router-dom"

function AgentDashboard() {
    const navigate = useNavigate()
  return (
    <div className="dashboard">
        <button onClick={()=> navigate('new-report')}>New Report</button>
        <button onClick={()=> navigate('my-reports')}>My reports</button>
        <button onClick={()=> navigate('csv-upload')}>CSV Upload</button>

    </div>
  )
}

export default AgentDashboard