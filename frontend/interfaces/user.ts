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
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  PRINCIPAL = "PRINCIPAL",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
  PARENT = "PARENT"
}

export const UserRoles = new Map<string, string>([
  [UserRoleEnums.SUPER_ADMIN, "Super Admin"],
  [UserRoleEnums.ADMIN, "Admin"],
  [UserRoleEnums.PRINCIPAL, "Principal"],
  [UserRoleEnums.TEACHER, "Teacher"],
  [UserRoleEnums.STUDENT, "Student"],
  [UserRoleEnums.PARENT, "Parent"],
])

export interface CreateStaffForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  identificationType: IdentificationTypeEnum;
  identification: string;
  role: UserRoleEnums.ADMIN | UserRoleEnums.TEACHER;
  position: string;
  additionalInfo: string;
}
