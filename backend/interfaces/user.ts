import { Document } from 'mongoose'

export interface UserModelInterface extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  role: {
    type: string;
    enum: UserRoleEnums
  };
}

export enum UserRoleEnums {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  PRINCIPAL = "PRINCIPAL",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
  PARENT = "PARENT"
}
