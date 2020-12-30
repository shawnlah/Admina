import { model, Schema } from "mongoose";
import { TeacherModelInterface } from "../interfaces/teacher";

const TeacherSchema: Schema = new Schema(
  {
    staff: {
      type: Schema.Types.ObjectId,
      ref: 'Staff',
      required: true
    },
    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true
      }
    ],
    additionalInfo: {
      type: String
    },
    inventoriesBorrowed: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Inventory'
      }
    ]
  }
)

export default model<TeacherModelInterface>('Teacher', TeacherSchema)
