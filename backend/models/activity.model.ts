import { model, Schema } from "mongoose";
import { ActivityModelInterface } from "../interfaces/activity";

const ActivitySchema = new Schema(
  {
    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default model<ActivityModelInterface>('Activity', ActivitySchema)
