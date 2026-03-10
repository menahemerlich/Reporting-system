import { useContext } from 'react'
import { AuthContext } from '../AuthContext'

function AdminUsersPage() {
    const { token } = useContext(AuthContext)
  return (
    <div>
        <div>Create new user</div>
        <div>Users

        </div>
    </div>
  )
}

export default AdminUsersPage