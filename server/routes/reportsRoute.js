import express from "express";
import multer from "multer";
import { authMiddleware } from "../middleware.js";
import { nanoid } from 'nanoid'

const upload = multer({
    dest: 'uploads/', limits: {
        fileSize: 5 * 1024 * 1024
    }
})
export const reportsRoute = express.Router()


reportsRoute.post('/', authMiddleware, (req, res) => {
    upload.single('image')(req, res, (err) => {
        
        const { category, urgency, message } = req.body
        if (err && err.code === "LIMIT_FILE_SIZE") {
            return res.status(413).json({ message: "file too large" })
        }
        if (!category || !urgency || !message) {
            return res.status(400).json({ message: "Missing fields" })
        }
        const newReport = {}
        newReport.id = nanoid(5)
        newReport.userId = req.user.id
        newReport.category = category
        newReport.urgency = urgency
        newReport.message = message
        req.file ? newReport.imagePath = req.file.path: ''
        newReport.sourceType = "agent"
        newReport.createdAt = new Date().toISOString()

        res.status(201).json(newReport)
    })

})