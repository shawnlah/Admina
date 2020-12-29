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
