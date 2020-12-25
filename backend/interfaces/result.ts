import { Document } from "mongoose";
import { ClassModelInterface } from "./class";
import { StudentModelInterface } from "./student";
import { SubjectModelInterface } from "./subject";
import { TeacherModelInterface } from "./teacher";

export interface ResultModelInterface extends Document {
  _id: string;
  semester: string;
  class: ClassModelInterface;
  subject: SubjectModelInterface;
  student: StudentModelInterface;
  teacher: TeacherModelInterface;
  score: string;
  createdAt: Date;
  updatedAt: Date;
}
