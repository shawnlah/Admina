import { model, Schema } from "mongoose";
import { ParentModelInterface } from "../interfaces/parent";

const ParentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Student'
      }
    ],
    isUnrelatedLegalGuardian: Boolean
  },
  {
    timestamps: true
  }
)

export default model<ParentModelInterface>('Parent', ParentSchema)
