import express from "express";
import multer from "multer";
import { authMiddleware } from "../middleware.js";
import { nanoid } from 'nanoid'
import path from "path"
import csv from 'csv-parser'
import fs from 'fs'
import { getReports, saveReport } from "../utils/fileFunctions.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/jpg"
        ]
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Only images allowed"))
        }
        cb(null, true)
    }
})

const uploadCsv = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'text/csv') {
            return cb(new Error("Only CSV allowed"))
        }
        cb(null, true)
    }
})

export const reportsRoute = express.Router()

reportsRoute.post('/', authMiddleware, (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(413).json({ message: "file too large" })
            }
            return res.status(415).json({ message: err.message })
        }
        const { category, urgency, message } = req.body

        if (!category || !urgency || !message) {
            fs.unlinkSync(req.file.path)
            return res.status(400).json({ message: "Missing fields" })
        }
        if (req.file) {
            req.body.imagePath = req.file.path
        }
        const newReport = saveReport(req.body, req.user.id, req.path)
        res.status(201).json(newReport)
    })
})

reportsRoute.post('/csv', authMiddleware, (req, res) => {
    uploadCsv.single('file')(req, res, (err) => {
        if (err) {
            return res.status(415).json({ message: err.message })
        }
        const results = []
        let count = 0
        const requiredFields = ["category", "urgency", "message"]
        const fieldsWithImage = ["category", "urgency", "message", "imagePath"]

        if (!req.file) {
            return res.status(400).json({ message: 'no file upload' })
        }
        const stream = fs.createReadStream(req.file.path)
            .pipe(csv())
            .on("headers", (headers) => {
                if (
                    JSON.stringify(headers) !== JSON.stringify(requiredFields) &&
                    JSON.stringify(headers) !== JSON.stringify(fieldsWithImage)
                ) {
                    fs.unlinkSync(req.file.path)
                    stream.destroy()
                    return res.status(400).json({ message: 'The CSV structure is incorrect.' })
                }
            })
            .on("data", (data) => {
                const hasEmpty = requiredFields.some(field =>
                    !data[field] || data[field].trim() === ""
                )
                if (hasEmpty) {
                    fs.unlinkSync(req.file.path)
                    stream.destroy()
                    return res.status(400).json({ message: 'Some reports are missing required fields.' })
                }
                results.push(data)
            })
            .on("end", () => {
                results.map(report => {
                    count++
                    saveReport(report, req.user.id, req.path)
                })
                return res.status(200).json({
                    message: "CSV-received",
                    data: results,
                    importedCount: count
                })
            })
    })
})

reportsRoute.get("/", authMiddleware, (req, res) => {
    const user = req.user
    const { agentId, category, urgency, message } = req.query
    const reports = getReports(user)
    let filtered = reports

    if (agentId) {
        filtered = filtered.filter(item => item.userId == agentId)
    }
    if (category) {
        filtered = filtered.filter(item => item.category === category)
    }
    if (urgency) {
        filtered = filtered.filter(item => item.urgency === urgency)
    }
    if (message) {
        filtered = filtered.filter(item => item.message === message)
    }
    res.status(200).json(filtered)
})

reportsRoute.get('/:id', authMiddleware, (req, res) => {
    const { id } = req.params
    const reports = getReports(req.user)
    const report = reports.filter(report => {
        return report.id === id
    })
    if (report.length > 0) {
        return res.status(200).json(report[0])
    }
    return res.status(404).json({ message: "report not found!" })
})
