import { Document } from 'mongoose'

export interface UserModelInterface extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  identification: string;
  identificationType: IdentificationTypeEnum;
  role: {
    type: string;
    enum: UserRoleEnums
  };
  hashedRefreshTokens: string[];
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

export enum IdentificationTypeEnum {
  NEW_IC = "NEW_IC",
  OLD_IC = "OLD_IC",
  PASSPORT = "PASSPORT"
}
