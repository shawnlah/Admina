import { model, Schema } from "mongoose";
import { ResultModelInterface } from "../interfaces/result";

const ResultSchema = new Schema(
  {
    semester: {
      type: String,
      required: true
    },
    class: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Class'
    },
    subject: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Subject'
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
    score: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default model<ResultModelInterface>('Result', ResultSchema)
