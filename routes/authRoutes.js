import express from 'express'
import { dashboard, signUp } from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.get('/dashboard', signUp)
authRouter.post('/signup', dashboard)

export default authRouter
