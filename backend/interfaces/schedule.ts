import { Document } from "mongoose";
import { UserModelInterface } from "./user";

export interface ScheduleModelInterface extends Document {
  _id: string;
  user: UserModelInterface;
  name: string;
  description: string;
  when: Date;
  createdAt: string;
  updatedAt: string;
}
