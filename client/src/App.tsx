import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './AuthContext'
import LoginProtected from './components/LoginProtected'
import AgentDashboard from './pages/AgentDashboard'
import NewReportPage from './pages/NewReportPage'
import CSVUploadPage from './pages/CSVUploadPage'
import MyReportsPage from './pages/MyReportsPage'
import AdminProtected from './components/AdminProtected'
import AdminDashboard from './pages/AdminDashboard'
import AdminUsersPage from './pages/AdminUsersPage'
import AdminReportsPage from './pages/AdminReportsPage'
import Layout from './components/Layout'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path='/login' element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route element={<LoginProtected />}>
              <Route path="/dashboard" element={<AgentDashboard />} />
              <Route path="/dashboard/my-reports" element={<MyReportsPage />} />
              <Route path="/dashboard/new-report" element={<NewReportPage />} />
              <Route path="/dashboard/csv-upload" element={<CSVUploadPage />} />
            </Route>
            <Route element={<AdminProtected />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/agents" element={<AdminUsersPage />} />
              <Route path="/admin/reports" element={<AdminReportsPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
