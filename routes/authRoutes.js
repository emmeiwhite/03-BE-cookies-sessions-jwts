import express from 'express'

const authRouter = express.Router()

authRouter.get('/dashboard')
authRouter.post('/signup')

export default authRouter
