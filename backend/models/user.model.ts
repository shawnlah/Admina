import { Schema, model } from 'mongoose'
import { IdentificationTypeEnum, UserModelInterface, UserRoleEnums } from '../interfaces/user'

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
    identification: {
      type: String,
      required: true
    },
    identificationType: {
      type: String,
      required: true,
      enum: Object.values(IdentificationTypeEnum)
    },
    email: {
      type: String,
      unique: true
    },
    password_hash: {
      type: String,
      required: true
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
    },
    hashedRefreshTokens: [
      {
        type: String,
        required: true
      }
    ],
  },
  {
    timestamps: true
  }
)

export default model<UserModelInterface>('User', UserSchema)
