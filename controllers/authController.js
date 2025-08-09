import User from '../models/User.js'

export const signUp = async (req, res) => {
  // Testing  const user = await User.create(req.body)

  try {
    const { name, email, password } = req.body
    // 1. Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, msg: 'All fields are required' })
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ success: false, msg: 'Email already registered' })
    }
  } catch (error) {
    req.status(500).json()
  }

  res.status(200).json({
    success: true,
    msg: 'User successfully signed up'
  })
}
