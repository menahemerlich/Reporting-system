import { useContext, useState } from 'react'
import { AuthContext } from '../AuthContext'

function AdminUsersPage() {
    const { token } = useContext(AuthContext)
    const [data, setData] = useState([])
    async function fetchUsers() {
        const response = await fetch(
            `http://localhost:3001/admin/users`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        const result = await response.json()
        setData(result)
    }
  return (
    <div>
        <div>Create new user</div>
        <div>Users

        </div>
    </div>
  )
}

export default AdminUsersPage