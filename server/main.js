import express from 'express'
import cors from 'cors'
import { authRoute } from './routes/authRoute.js'
import { reportsRoute } from './routes/reportsRoute.js'
import { adminRoute } from './routes/adminRoute.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use('/auth', authRoute)
app.use('/reports', reportsRoute)
app.use('/admin', adminRoute)
app.listen(3001, ()=>{
    console.log('server runing...');
})