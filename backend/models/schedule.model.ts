import { model, Schema } from "mongoose";
import { ScheduleModelInterface } from "../interfaces/schedule";

const ScheduleSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: String,
    description: String,
    when: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default model<ScheduleModelInterface>('Schedule', ScheduleSchema)
