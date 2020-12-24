import { model, Schema } from "mongoose";
import { InventoryModelInterface } from "../interfaces/inventory";

const InventoryHistorySchema: Schema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: 'Inventory',
      required: true
    },
    borrowedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    borrowedOn: {
      type: Date,
      required: true
    },
    returnedOn: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

export default model<InventoryModelInterface>('InventoryHistory', InventoryHistorySchema)
