import express from "express";
import multer from "multer";
import { authMiddleware } from "../middleware.js";
import { nanoid } from 'nanoid'
import path from "path"
import csv from 'csv-parser'
import fs from 'fs'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, nanoid(10) + ext)
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

const uploadCsv = multer({ dest: 'uploads/' })
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
            return res.status(400).json({ message: "Missing fields" })
        }
        const newReport = {
            id: nanoid(5),
            userId: req.user.id,
            category,
            urgency,
            message,
            imagePath: req.file ? req.file.path : null,
            sourceType: "agent",
            createdAt: new Date().toISOString()
        }
        res.status(201).json(newReport)
    })
})

reportsRoute.post('/csv', uploadCsv.single("file"), (req, res) => {
    const results = []
    const fields = ["category", "urgency", "message"]
    if (!req.file) {
        return res.status(400).json({ message: 'no file upload' })
    }
    const stream = fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("headers", (headers) => {
            if (JSON.stringify(fields) !== JSON.stringify(headers)) {
                fs.unlinkSync(req.file.path)
                stream.destroy()
                return res.status(400).json({ message: 'The CSV structure is incorrect.' })
            }
        })
        .on("data", (data) => {
            if (Object.values(data).some(v => !v || v.trim() === "")) {
                fs.unlinkSync(req.file.path)
                stream.destroy()
                return res.status(400).json({ message: 'The CSV structure is incorrect.' })
            }
            results.push(data)
        })
        .on("end", () => {
            return res.status(200).json({
                message: "CSV-received",
                data: results
            })
        })
})