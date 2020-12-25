import { Document } from "mongoose";
import { StudentModelInterface } from "./student";

export interface ClassModelInterface extends Document {
  _id: string;
  semester: string;
  className: string;
  students: StudentModelInterface[];
  createdAt: Date;
  updatedAt: Date;
}
