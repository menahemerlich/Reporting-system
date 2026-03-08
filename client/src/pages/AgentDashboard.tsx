import { useNavigate } from "react-router-dom"

function AgentDashboard() {
    const navigate = useNavigate()
  return (
    <div>
        <button onClick={()=> navigate('new-report')}>New Report</button>
        
        <button onClick={()=> navigate('my-reports')}>My reports</button>
    </div>
  )
}

export default AgentDashboard