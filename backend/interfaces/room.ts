import { Document } from "mongoose";

export interface RoomModelInterface extends Document {
  _id: string;
  roomNumber: string;
  isAvailable: boolean;
  schedule: {
    date: string;
    description: string;
  }[];
  updatedAt: string;
  createdAt: string;
}
