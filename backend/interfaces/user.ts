import { Document } from 'mongoose'

export interface UserModelInterface extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  role: {
    type: string;
    enum: UserRoleEnums
  };
  updatedAt: string;
  createdAt: string;
}

export enum UserRoleEnums {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  PRINCIPAL = "PRINCIPAL",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
  PARENT = "PARENT"
}
