import { Document } from "mongoose";

export enum MonthEnums {
  JANUARY = 'JANUARY',
  FEBRUARY = 'FABRUARY',
  MARCH = 'MARCH',
  APRIL = 'APRIL',
  MAY = 'MAY',
  JUNE = 'JUNE',
  JULY = 'JULY',
  AUGUST = 'AUGUST',
  SEPTEMBER = 'SEPTEMBER',
  OCTOBER = 'OCTOBER',
  NOVEMBER = 'NOVEMBER',
  DECEMBER = 'DECEMBER'
}

export interface SalaryModelInterface extends Document {
  _id: string;
  month: MonthEnums;
  year: number;
  basicPay: string;
  employeeEpfPercentage: string;
  companyEpfPercentage: string;
  createdAt: Date;
  updatedAt: Date;
}
