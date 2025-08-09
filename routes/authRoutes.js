import express from 'express'
import { signUp } from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.get('/signup', signUp)

export default authRouter
