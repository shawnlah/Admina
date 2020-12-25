import { model, Schema } from "mongoose";
import { LeaveModelInterface, LeaveTypeEnum } from "../interfaces/leave";

const LeaveSchema = new Schema(
  {
    leaveType: {
      type: String,
      enum: Object.values(LeaveTypeEnum),
      required: true
    },
    description: String,
    leaveDate: {
      type: Date,
      required: true
    },
    medicalCert: String
  },
  {
    timestamps: true
  }
)

export default model<LeaveModelInterface>('Leave', LeaveSchema)
