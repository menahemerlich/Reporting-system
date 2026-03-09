import express from 'express'
import { adminMiddleware } from '../middleware.js'
import { nanoid } from 'nanoid'
import { atbashHash } from '../utils/hashPassword.js'
import fs from 'fs'

export const adminRoute = express.Router()

adminRoute.post('/user', adminMiddleware, async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Missing fields" })
    }
    const { agentCode, fullName, role } = req.body
    if (!agentCode || !fullName || !role || !["admin", "agent"].includes(role)
        || typeof agentCode !== 'string' || typeof fullName !== 'string') {
        return res.status(400).json({ message: "Missing fields" })
    }
    const users = JSON.parse(fs.readFileSync("./db/users.json"))
    for (const user of users) {
        if (user.agentCode === agentCode) {
            return res.status(409).json({ message: "agentCode is exist" })
        }
    }
    const newUser = {
        id: nanoid(3),
        agentCode,
        fullName,
        passwordHash: await atbashHash(fullName),
        role,
        createdAt: new Date().toISOString()
    }
    users.push(newUser)
    fs.writeFileSync("./db/users.json", JSON.stringify(users, null, 2))
    res.status(200).json({
        user: {
            id: newUser.id,
            agentCode,
            fullName,
            role,
            initialPasswordHint: "atbadh..."
        }
    })
})

adminRoute.get('/users', adminMiddleware, (req, res)=>{
    const users = JSON.parse(fs.readFileSync("./db/users.json"))
    res.status(200).json({users: users})
})