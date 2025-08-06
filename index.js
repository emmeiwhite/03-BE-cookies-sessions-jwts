import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

// 1. Routes
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      users: ['immi', 'jimmi', 'timmi']
    }
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`listening to PORT ${PORT}`)
})
