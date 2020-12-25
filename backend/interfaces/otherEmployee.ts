import { Document } from "mongoose";
import { InventoryModelInterface } from "./inventory";
import { StaffModelInterface } from "./staff";

export interface OtherEmployeeModelInterface extends Document {
  _id: string;
  staff: StaffModelInterface;
  position: string;
  additionalInfo: string;
  inventoriesBorrowed: InventoryModelInterface[];
  createdAt: Date;
  updatedAt: Date;
}
