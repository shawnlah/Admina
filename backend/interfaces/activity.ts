import { Document } from "mongoose";

export interface ActivityModelInterface extends Document {
  _id: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
