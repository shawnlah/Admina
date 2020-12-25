import { Document } from "mongoose";
import { ResultModelInterface } from "./result";
import { StudentModelInterface } from "./student";
import { TeacherModelInterface } from "./teacher";

export enum CoreAreas {
  SCIENCE = 'SCIENCE',
  ART = 'ART',
}

export interface SubjectModelInterface extends Document {
  _id: string;
  name: string;
  teacher: TeacherModelInterface;
  student: StudentModelInterface;
  result: ResultModelInterface;
}
