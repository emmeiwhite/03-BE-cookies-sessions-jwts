import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { success } from 'zod'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

// 1. Routes

// 2. Let's setup cookie and send it to the Browser the first time and then Browser will sent it on every request:
app.get('/', (req, res) => {
  // Setup cookies for the first time as user visits homepage
  res.cookie('username', 'Imran', {
    httpOnly: true,
    maxAge: 1000 * 60 * 5 // 5 minutes
  })

  res.status(200).json({
    success: true,
    data: {
      msg: 'Cookie set username'
    }
  })
})

app.get('/login', (req, res) => {
  //  Access cookie with req.cookies.cookieName
  console.log(req.cookies)

  if (req.cookies.username === 'Imran') {
    res.status(200).json({
      success: true,
      data: {
        msg: 'User successfully log-in'
      }
    })
  } else {
    res.status(400).json({
      success: false,
      data: {
        msg: 'Login Failed!'
      }
    })
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`listening to PORT ${PORT}`)
})
