import { Schema, model } from 'mongoose'
import { UserModelInterface, UserRoleEnums } from '../interfaces/user'

const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true
    },
    phone: {
      type: String,
      unique: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    role: {
      type: String,
      enum: Object.values(UserRoleEnums),
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default model<UserModelInterface>('User', UserSchema)
