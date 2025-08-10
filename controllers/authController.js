import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signUp = async (req, res) => {
  // Testing  const user = await User.create(req.body)
  console.log(req.body)
  try {
    const { username, email, password } = req.body

    // 1. Validate fields
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, msg: 'All fields are required' })
    }

    // 2. Check if user already exists
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
