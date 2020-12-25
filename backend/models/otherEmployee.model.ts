import { model, Schema } from "mongoose";
import { OtherEmployeeModelInterface } from "../interfaces/otherEmployee";

const OtherEmployeeSchema = new Schema(
  {
    staff: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Staff'
    },
    postition: {
      type: String
    },
    additionalInfo: {
      type: String
    },
    inventoriesBorrowed: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Inventory'
      }
    ]
  },
  {
    timestamps: true
  }
)

export default model<OtherEmployeeModelInterface>('Other_Employee', OtherEmployeeSchema)
