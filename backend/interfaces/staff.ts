import { Document } from "mongoose";
import { LeaveModelInterface } from "./leave";
import { ScheduleModelInterface } from "./schedule";
import { UserModelInterface } from "./user";

export interface StaffModelInterface extends Document {
  _id: string;
  leaveHistory: LeaveModelInterface[];
  noticePeriod: number;
  semesterSchedule: ScheduleModelInterface[];
  user: UserModelInterface;
}
