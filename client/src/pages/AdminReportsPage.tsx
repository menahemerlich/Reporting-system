import SearchReports from '../components/SearchReports'
import ReportsTable from '../components/ReportsTable'

function AdminReportsPage() {
    return (
        <div id='reports'>
            <SearchReports />
            <ReportsTable />
        </div>
    )
}

export default AdminReportsPage