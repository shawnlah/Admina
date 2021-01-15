import { model, Schema } from "mongoose";
import { MonthEnums, SalaryModelInterface } from "../interfaces/salary";

const SalarySchema = new Schema(
  {
    month: {
      type: String,
      enum: Object.values(MonthEnums),
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    basicPay: {
      type: String,
      required: true
    },
    employeeEpfAmount: {
      type: String,
      required: true
    },
    companyEpfAmount: {
      type: String,
      required: true
    },
    socsoAmount: {
      type: String,
      required: true
    },
    deductions: [
      {
        name: {
          type: String,
          required: true
        },
        description: {
          type: String,
        }
      }
    ],
    extraIncomes: [
      {
        name: {
          type: String,
          required: true
        },
        description: {
          type: String
        }
      }
    ],
    netPay: {
      type: String,
      reuired: true
    },
    salaryS3Url: String,
  },
  {
    timestamps: true
  }
)

export default model<SalaryModelInterface>('Salary', SalarySchema)
