import { model, Schema } from "mongoose";
import { RoomModelInterface } from "../interfaces/room";

const RoomSchema: Schema = new Schema(
  {
    roomNumber: {
      type: String,
      required: true
    },
    isAvailable: {
      type: Boolean,
      required: true
    },
    schedule: [
      {
        date: {
          type: Date,
          required: true
        },
        description: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
)

export default model<RoomModelInterface>('Room', RoomSchema)
