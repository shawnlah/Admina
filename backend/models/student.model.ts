import { model, Schema } from "mongoose";
import { StudentModelInterface } from "../interfaces/student";
import { CoreAreas } from "../interfaces/subject";

const StudentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    semester: {
      type: String,
      required: true
    },
    class: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Class'
    },
    subjects: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Subject'
      }
    ],
    core: {
      type: String,
      enum: Object.values(CoreAreas)
    },
    reportedSickDays: [
      {
        when: {
          type: Date,
          required: true
        },
        description: {
          type: String,
          required: true
        },
        medicalCert: {
          type: String
        }
      }
    ],
    inventoriesBorrowed: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Inventory'
      }
    ],
    results: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Result',
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
)

export default model<StudentModelInterface>('Student', StudentSchema)
