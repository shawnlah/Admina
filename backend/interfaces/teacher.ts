import { Document } from "mongoose";
import { ClassModelInterface } from "./class";
import { InventoryModelInterface } from "./inventory";
import { StaffModelInterface } from "./staff";

export interface TeacherModelInterface extends Document {
  _id: string;
  staff: StaffModelInterface;
  classes: ClassModelInterface[];
  inventoriesBorrowed: InventoryModelInterface[];
  createdAt: Date;
  updatedAt: Date;
}
