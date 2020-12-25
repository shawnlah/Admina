import { model, Schema } from "mongoose";
import { SubjectModelInterface } from "../interfaces/subject";

const SubjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    student: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Student'
    },
    teacher: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Teacher'
    },
    result: {
      type: Schema.Types.ObjectId,
      ref: 'Result'
    }
  },
  {
    timestamps: true
  }
)

export default model<SubjectModelInterface>('Subject', SubjectSchema)
