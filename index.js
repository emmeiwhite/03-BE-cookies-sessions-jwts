import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { logger } from './middlewares/logger.js'
import notFound from './middlewares/notFound.js'
import errorHandler from './middlewares/errorHandler.js'
import connectDB from './db/dbConnect.js'
import authRouter from './routes/authRoutes.js'

dotenv.config()

// DB Connection
connectDB()

const app = express()
app.use(express.json()) // <- must be BEFORE routes

// Cookie-Parser to parse cookie which is JWT basically
app.use(cookieParser())

// Core Middlewares
app.use(logger)
// allow credentials so browser sends cookies
app.use(
  cors({
    origin: 'http://localhost:5173', // your React app origin
    credentials: true
  })
)

// Test Home Route:
app.get('/', (req, res) => {
  res.json({
    msg: 'All is well, that starts well'
  })
})

app.use('/api/v1', authRouter)
// 404 Middleware
app.use(notFound)

// Error Handler Middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`listening to PORT ${PORT}`)
})
