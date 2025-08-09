import mongoose from 'mongoose'

// Step-1: Create Schema: Structure of the Entity in the Database
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

// Step-2: Create Model

const User = mongoose.model('User', userSchema)
export default User
