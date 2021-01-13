import { Document } from "mongoose";

export enum LeaveTypeEnum {
  ANNUAL = 'ANNUAL',
  CARRY_FORWARD = 'CARRY_FORWARD',
  SICK = 'SICK',
  UNPAID = 'UNPAID'
}

export enum LeaveStatusEnum {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  CANCELED = 'CANCELED',
  REJECTED = 'REJECTED',
}

export interface LeaveModelInterface extends Document {
  _id: string;
  leaveType: LeaveTypeEnum;
  description: string;
  leaveStartDate: Date;
  leaveEndDate: Date;
  leaveStatus: LeaveStatusEnum;
  additionalInfo: string;
  createdAt: Date;
  updatedAt: Date;
  medicalCertS3Url: string;
}

export interface CreateLeaveRequest {
  auth0UserId: string;
  leaveType: LeaveTypeEnum;
  description?: string;
  leaveStartDate: Date;
  leaveEndDate: Date;
  medicalCertS3Url?: string;
}
