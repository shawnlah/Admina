import { Document } from "mongoose";
import { StudentModelInterface } from "./student";
import { UserModelInterface } from "./user";

export interface ParentModelInterface extends Document {
  _id: string;
  user: UserModelInterface;
  children: StudentModelInterface[];
  isUnrelatedLegalGuardian: boolean;
  createdAt: Date;
  updatedAt: Date;
}
