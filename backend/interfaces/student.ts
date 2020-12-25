import { Document } from "mongoose";
import { ClassModelInterface } from "./class";
import { InventoryModelInterface } from "./inventory";
import { ResultModelInterface } from "./result";
import { CoreAreas, SubjectModelInterface } from "./subject";
import { UserModelInterface } from "./user";

export interface StudentModelInterface extends Document {
  _id: string;
  user: UserModelInterface;
  semester: string;
  class: ClassModelInterface;
  subjects: SubjectModelInterface;
  core: CoreAreas;
  reportedSickDays: {
    when: Date;
    description: string;
    medicalCert: string;
  },
  inventoriesBorrowed: InventoryModelInterface[];
  results: ResultModelInterface[];
}
