import { model, Schema } from "mongoose";
import { ClassModelInterface } from "../interfaces/class";

const ClassSchema = new Schema(
  {
    semester: {
      type: String,
      required: true
    },
    className: {
      type: String,
      required: true
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Student'
      }
    ]
  },
  {
    timestamps: true
  }
)

export default model<ClassModelInterface>('Class', ClassSchema)
