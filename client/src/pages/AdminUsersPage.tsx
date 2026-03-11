import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../AuthContext'

function AdminUsersPage() {
    const { token } = useContext(AuthContext)
    const [data, setData] = useState<any[]>([])
    const [agentCode, setAgentCode] = useState("")
    const [fullName, setFullName] = useState("")
    const [role, setRole] = useState("")

    async function fetchUsers() {
        const response = await fetch(
            "http://localhost:3001/admin/users",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        const result = await response.json()
        setData(result.users)
    }

    async function createUser() {
        const raw = JSON.stringify({
            agentCode: agentCode,
            fullName: fullName,
            role: role
        })

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: raw
        }
        try {
            const response = await fetch(
                "http://localhost:3001/admin/user",
                requestOptions
            )
            const result = await response.json()
            if (response.ok) {
                setAgentCode("")
                setFullName("")
                setRole("")
                alert(`User created successfully. id: ${result.user.id}`)
            } else {
                setAgentCode("")
                setFullName("")
                setRole("")
                alert(result.message)
            }
            await fetchUsers()

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className='usersPage'>

            <div className='users'>
                <h1>Users</h1>

                {data.length > 0 ? (
                    <table className="Table">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>agentCode</th>
                                <th>fullName</th>
                                <th>role</th>
                                <th>created_at</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((user: any) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.agentCode}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.role}</td>
                                    <td>{user.createdAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>No users found</div>
                )}
            </div>
            <div className='creatUser'>
                <h1>Create new user</h1>
                <div className="newUser">
                    <label>Agent code</label>
                    <input
                        type="text"
                        placeholder='e.g. `a100`'
                        value={agentCode}
                        onChange={(e) => setAgentCode(e.target.value)}
                    />

                    <label>Full name</label>
                    <input
                        type="text"
                        placeholder='e.g. `david`'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />

                    <label>Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="" >Please select</option>
                        <option value="agent">Agent</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button onClick={createUser}>Create User</button>
                </div>
            </div>
        </div>
    )
}

export default AdminUsersPage