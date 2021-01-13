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
    auth0UserId: {
      type: String,
      required: true,
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
    },
    position: {
      type: String,
      required: true
    },
    reportingPerson: {
      type: String,
      required: true
    },
    employeesUnderUser: [
      {
        type: Schema.Types.ObjectId,
        required: true
      }
    ],
    currentBasicPay: {
      type: String,
      required: true
    },
    noticePeriod: {
      type: Number,
      required: true
    },
    remainingLeaveDays: {
      type: Number,
      required: true
    },
    leavesHistory: [
      {
        type: Schema.Types.ObjectId,
        required: true
      }
    ],
    salaryHistory: [
      {
        type: Schema.Types.ObjectId,
        required: true
      }
    ],
    activities: [
      {
        type: Schema.Types.ObjectId,
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
)

export default model<UserModelInterface>('User', UserSchema)
