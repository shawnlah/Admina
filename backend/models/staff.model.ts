import { model, Schema } from "mongoose";
import { StaffModelInterface } from "../interfaces/staff";

const StaffSchema = new Schema(
  {
    leaveHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Leave'
      }
    ],
    noticePeriod: Number,
    semesterSchedule: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Schedule'
      }
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

export default model<StaffModelInterface>('Staff', StaffSchema)
