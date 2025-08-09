import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { logger } from './middlewares/logger.js'
import notFound from './middlewares/notFound.js'
import errorHandler from './middlewares/errorHandler.js'
import connectDB from './db/dbConnect.js'
import authRouter from './routes/authRoutes.js'

dotenv.config()

// DB Connection
connectDB()

const app = express()

// Core Middlewares
app.use(logger)
app.use(cors())
app.use(express.json())

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
