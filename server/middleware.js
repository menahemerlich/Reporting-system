import jwt from "jsonwebtoken"

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ message: "no token" })
    }
    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch {
        return res.status(401).json({ message: "invalid token" })
    }
}

export function adminMiddleware(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ message: "no token" })
    }
    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded        
        if (decoded.role === 'admin') {
            next()
        } else {
            res.status(403).json({message: "No permissions"})
        }
    } catch {
        return res.status(401).json({ message: "invalid token" })
    }
}