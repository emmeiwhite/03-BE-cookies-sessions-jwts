import User from '../models/User.js'

export const signUp = async (req, res) => {
  console.log(req.body)
  // Testing
  const user = await User.create(req.body)

  res.status(200).json({
    success: true,
    msg: 'User successfully signed up'
  })
}
