import { Document } from 'mongoose'
import { UserModelInterface } from './user'

export interface InventoryHistory {
  item: InventoryModelInterface;
  borrowedBy: UserModelInterface;
  borrowedOn: Date;
  returnedOn: Date;
}

export interface InventoryModelInterface extends Document {
  name: string;
  description: string;
  history: InventoryHistory[];
  inventoryType: string;
  isAvailable: boolean;
  location: string;
  lastBorrowedBy: UserModelInterface;
  lastBorrowedDate: Date;
  purchasedOn: Date;
  purchasedAt: string;
  purchasePrice: string;
}
