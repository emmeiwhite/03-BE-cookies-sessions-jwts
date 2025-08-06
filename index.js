import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use(
  session({
    secret: 'mySecretSessionKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 10, // 10 min
      httpOnly: true
    }
  })
)

// Login route that sets session
app.get('/session-login', (req, res) => {
  req.session.user = 'Imran'
  res.send('Session set for Imran')
})

// Access session
app.get('/session-check', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome back ${req.session.user}`)
  } else {
    res.send('No session found')
  }
})

// Destroy session
app.get('/logout', (req, res) => {
  req.session.destroy()
  res.send('Logged out and session destroyed')
})

// 1. Routes

// 2. Let's setup cookie and send it to the Browser the first time and then Browser will sent it on every request:

/* ---
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
  --- */

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`listening to PORT ${PORT}`)
})
