import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000

connectDB();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}))

app.use('/api/auth/', authRouter)
app.use('/api/user/', userRouter)

app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
})