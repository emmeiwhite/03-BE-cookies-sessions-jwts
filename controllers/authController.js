import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// 1. Signup
export const signUp = async (req, res) => {
  // Testing  const user = await User.create(req.body)
  console.log(req.body)
  try {
    const { username, email, password } = req.body

    // 1. Validate fields
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, msg: 'All fields are required' })
    }

    // 2. Check if user already exists with email
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ success: false, msg: 'Email already registered' })
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // 4. Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    })

    console.log(user)

    // 5. Respond
    res.status(201).json({
      success: true,
      msg: 'User registered successfully',
      data: { id: user._id, email: user.email, username: user.username }
    })
  } catch (error) {
    res.status(500).json('Error while Signup')
  }
}

// 2. Login
export const login = async (req, res) => {
  console.log(req.body)

  try {
    const { email, password } = req.body

    // 1. Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: 'email & password is mandatory!'
      })
    }

    // 2. Check whether the email exists in the database
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ success: false, msg: 'Invalid credentials' })
    }

    // 3. If user of the particular email exists, let verify the hashed password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ success: false, msg: 'Invalid password' })
    }

    // 4. Proceed to JWT creation (If email & password are correct)
    /**  We know that JWT has 3 parts Header.Payload.Signature, As a BE Developer we create payload, rest jsonwebtoken packages manages  */

    const payload = { userId: user._id.toString(), username: user.username }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' })

    // 5. Once the token is generated, we'll send the token to the client as cookie with httpsOnly
    res.cookie('authToken', token, {
      httpsOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000
    })

    // 6. Send Success Response to the client

    res.status(200).json({
      success: true,
      msg: 'Successful Login!',
      data: { userId: user._id, username: user.username, email: user.email }
    })
  } catch (error) {
    console.error('Login error:', err)
    next(err) // forward to global error handler
  }
}
