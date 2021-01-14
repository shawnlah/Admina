import { Document } from 'mongoose'

export interface UserModelInterface extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  auth0UserId: string;
  phone: string;
  dateOfBirth: Date;
  identification: string;
  identificationType: IdentificationTypeEnum;
  role: UserRoleEnums;
  position: string;
  reportingPerson: string;
  employeesUnderUser: string[];
  currentBasicPay: string;
  noticePeriod: number;
  remainingLeaveDays: number;
  leavesHistory: string[];
  leavesApprovedByUser: string[];
  leavesRejectedByUser: string[];
  leavesPendingUserApproval: string[];
  salaryHistory: string[];
  activities: string[];
  additionalInfo: string[];
  updatedAt: string;
  createdAt: string;
}

export enum UserRoleEnums {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE"
}

export enum IdentificationTypeEnum {
  NEW_IC = "NEW_IC",
  OLD_IC = "OLD_IC",
  PASSPORT = "PASSPORT"
}

export interface CreateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: Date;
  identificationType?: IdentificationTypeEnum;
  identification?: string;
  reportingPerson?: string;
  role?: UserRoleEnums;
  position?: string;
  currentBasicPay?: string;
  noticePeriod?: number;
  remainingLeaveDays?: number;
  additionalInfo?: string;
}
