import { success } from 'zod'

export const signUp = (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'User successfully signed up'
  })
}

export const dashboard = (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(200).json({
    success: true,
    msg: `Hello John! Welcome`,
    secret: `Here is your authorized data. You lucky Number is ${luckyNumber}`
  })
}
