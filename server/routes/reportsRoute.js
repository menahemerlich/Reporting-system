import express from "express";
import multer from "multer";
import { authMiddleware } from "../middleware";

const upload = multer({dest: 'uploads/'})
export const reportsRoute = express.Router()


reportsRoute.post('/reports', authMiddleware, upload.single(''), async(req, res)=>{

} )