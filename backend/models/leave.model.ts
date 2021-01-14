import { model, Schema } from "mongoose";
import { LeaveModelInterface, LeaveStatusEnum, LeaveTypeEnum } from "../interfaces/leave";

const LeaveSchema = new Schema(
  {
    leaveType: {
      type: String,
      enum: Object.values(LeaveTypeEnum),
      required: true
    },
    description: String,
    leaveStartDate: {
      type: Date,
      required: true
    },
    leaveEndDate: {
      type: Date,
      required: true
    },
    leaveStatus: {
      type: String,
      enum: Object.values(LeaveStatusEnum),
      required: true
    },
    additionalInfo: String,
    medicalCertS3Url: String,
    rejectedReason: String
  },
  {
    timestamps: true
  }
)

export default model<LeaveModelInterface>('Leave', LeaveSchema)
