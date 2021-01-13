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
    employeeEpfPercentage: {
      type: String,
      required: true
    },
    companyEpfPercentage: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default model<SalaryModelInterface>('Salary', SalarySchema)
