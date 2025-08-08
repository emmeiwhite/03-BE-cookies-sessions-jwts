import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { logger } from './middlewares/logger.js'

dotenv.config()

const app = express()

// Middlewares
app.use(logger)
app.use(cors())
app.use(express.json())

app.use('/', (req, res) => {
  res.json({
    msg: 'All is well, that starts well'
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`listening to PORT ${PORT}`)
})
