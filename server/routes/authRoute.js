import express from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import users from '../db/users.json' with {type: 'json'}
dotenv.config()

export const authRoute = express.Router()

authRoute.post('/login', async (req, res) => {
    if (req.body.agentCode && req.body.password && typeof req.body.agentCode === 'string' && typeof req.body.password === 'string') {
        const { agentCode, password } = req.body
        for (const user of users.users) {
            if (user.agentCode === agentCode && (await bcrypt.compare(password, user.passwordHash))) {
                const token = jwt.sign(
                    {
                        id: user.id,
                        agentCode: user.agentCode,
                        fullName: user.fullName,
                        role: user.role
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "2h" }
                )
                return res.status(200).json({ token, user: { id: user.id, agentCode: user.agentCode, fullName: user.fullName, role: user.role } })
            }
        }
        return res.status(401).json({ message: 'invalid credentials' })
    }
    return res.status(400).json({ message: 'Missing fields' })
})

authRoute.get('/me', (req, res) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ message: 'invalid token' })
    }
    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return res.status(200).json(decoded)
    } catch {
        return res.status(401).json({ message: 'invalid token' })
    }
})


