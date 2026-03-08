import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './AuthContext'
import LoginProtected from './components/LoginProtected'
import AgentDashboard from './pages/AgentDashboard'
import NewReportPage from './pages/NewReportPage'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <LoginProtected>
                <AgentDashboard />
              </LoginProtected>
            }
          />

          <Route
            path="/dashboard/my-reports"
            element={
              <LoginProtected>
                <div>MyReports</div>
              </LoginProtected>
            }
          />
          <Route
            path="/dashboard/new-report"
            element={
              <LoginProtected>
                <NewReportPage/>
              </LoginProtected>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
