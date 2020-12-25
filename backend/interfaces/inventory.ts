import { Document } from 'mongoose'
import { UserModelInterface } from './user'

export interface InventoryModelInterface extends Document {
  _id: string;
  name: string;
  description: string;
  history: {
    borrowedBy: string;
    borrowedOn: string;
    returnedOn: string;
  }[];
  inventoryType: string;
  isAvailable: boolean;
  location: string;
  lastBorrowedBy: UserModelInterface;
  lastBorrowedDate: Date;
  purchasedOn: Date;
  purchasedAt: string;
  purchasePrice: string;
  updatedAt: string;
  createdAt: string;
}
