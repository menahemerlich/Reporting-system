import { useNavigate } from 'react-router-dom'

function SearchReports({setQuery1, setQuery2, setQuery3, setReportId}: {setQuery1: React.Dispatch<React.SetStateAction<string>>, setQuery2: React.Dispatch<React.SetStateAction<string>>, setQuery3: React.Dispatch<React.SetStateAction<string>>, setReportId: React.Dispatch<React.SetStateAction<string>>}) {
    const navigate = useNavigate()

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
        </div>
    )
}

export default SearchReports