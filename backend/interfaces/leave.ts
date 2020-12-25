import { Document } from "mongoose";

export enum LeaveTypeEnum {
  ANNUAL = 'ANNUAL',
  CARRY_FORWARD = 'CARRY_FORWARD',
  SICK = 'SICK',
  UNPAID = 'UNPAID'
}

export interface LeaveModelInterface extends Document {
  _id: string;
  leaveType: LeaveTypeEnum;
  description: string;
  leaveDate: Date;
  createdAt: Date;
  updatedAt: Date;
  medicalCert: string;
}
