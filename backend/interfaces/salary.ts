import { Document } from "mongoose";

export enum MonthEnums {
  JANUARY = 'JANUARY',
  FEBRUARY = 'FEBRUARY',
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
  socsoPercentage: string;
  deductions: ExtraSalaryDetails[];
  extraIncomes: ExtraSalaryDetails[];
  netPay: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExtraSalaryDetails {
  name: string;
  description: string;
  amount: string;
}

export interface CreateSalaryRequest {
  employeeId: string;
  month: MonthEnums;
  year: number;
  deductions: ExtraSalaryDetails[];
  extraIncomes: ExtraSalaryDetails[];
}

export interface UpdateSalaryRequest {
  salaryId: string;
  month: MonthEnums;
  year: number;
  deductions: ExtraSalaryDetails[];
  extraIncomes: ExtraSalaryDetails[];
}
