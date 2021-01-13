import { NextFunction, Request, Response } from "express";
import { CreateLeaveRequest, LeaveModelInterface, LeaveStatusEnum } from "../interfaces/leave";
import logger from "../logger";
import LeaveModel from "../models/leave.model";
import UserModel from "../models/user.model";
import { BaseController } from "./base";

export default class LeaveController extends BaseController {
  // START - Private methods
  private async deleteLeave(leaveId: string) {
    try {
      await LeaveModel.deleteOne({ _id: leaveId })
      logger.info('[CREATE_LEAVE] Leave deleted', leaveId)
    } catch (error) {
      logger.error('[CREATE_LEAVE] Failed to delete leave document with id=', leaveId)
    }
  }
  // END - Private methods

  async create(req: Request, res: Response, next: NextFunction) {
    const {
      auth0UserId,
      description,
      leaveStartDate,
      leaveEndDate,
      leaveType,
      medicalCertS3Url
    }: CreateLeaveRequest = req.body

    // 1) Create leave
    let leave: LeaveModelInterface
    try {
      logger.info('[CREATE_LEAVE] Creating leave ...')
      leave = await new LeaveModel({
        leaveType,
        description,
        leaveStartDate,
        leaveEndDate,
        leaveStatus: LeaveStatusEnum.PENDING,
        medicalCertS3Url
      }).save()
    } catch (leaveError) {
      logger.error('[CREATE_LEAVE] Failed to create leave', leaveError)
      return this.internalServerError(res)
    }

    // 2) Update user leave history
    try {
      await UserModel.findOneAndUpdate({ auth0UserId }, { $push: { leavesHistory: leave._id } })
    } catch (userError) {
      logger.error('[CREATE_LEAVE] Failed to save leave to user', userError)
      this.deleteLeave(leave._id)
      return this.internalServerError(res)
    }
    return this.ok(res)
  }
}
