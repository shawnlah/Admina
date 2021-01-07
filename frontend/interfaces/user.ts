export enum IdentificationTypeEnum {
  NEW_IC = "NEW_IC",
  OLD_IC = "OLD_IC",
  PASSPORT = "PASSPORT"
}

export const IdentificationTypes = new Map<string, string>([
  [IdentificationTypeEnum.NEW_IC, "New IC"],
  [IdentificationTypeEnum.OLD_IC, "Old IC"],
  [IdentificationTypeEnum.PASSPORT, "Passport"]
])

export enum UserRoleEnums {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE"
}

export const UserRoles = new Map<string, string>([
  [UserRoleEnums.ADMIN, "Admin"],
  [UserRoleEnums.EMPLOYEE, "Employee"],
])

export interface CreateStaffForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  identificationType: IdentificationTypeEnum;
  identification: string;
  role: UserRoleEnums;
  position: string;
  additionalInfo: string;
}
