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
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    employeesUnderUser: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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
        required: true,
        ref: 'Leave'
      }
    ],
    leavesApprovedByUser: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Leave'
      }
    ],
    leavesRejectedByUser: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Leave'
      }
    ],
    leavesPendingUserApproval: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Leave'
      }
    ],
    salaryHistory: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Salary'
      }
    ],
    activities: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Activity'
      }
    ]
  },
  {
    timestamps: true
  }
)

export default model<UserModelInterface>('User', UserSchema)
