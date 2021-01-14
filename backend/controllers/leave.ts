import { NextFunction, Request, Response } from "express";
import { ApproveLeaveRequest, CancelLeaveRequest, CreateLeaveRequest, LeaveModelInterface, LeaveStatusEnum, RejectLeaveRequest } from "../interfaces/leave";
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

  private async removeLeaveFromReportingPerson(reportingPersonId: string, leaveId: string) {
    return (await UserModel.updateOne({ _id: reportingPersonId }, { $pull: { leavesPendingUserApproval: leaveId } }))
  }

  private async updateLeaveStatus(leaveId: string, status: LeaveStatusEnum) {
    return (await LeaveModel.updateOne({ _id: leaveId }, { leaveStatus: status }))
  }
  // END - Private methods

  // START - Get leave history
  async list(req: Request, res: Response, next: NextFunction) {
    return this.ok(res)
  }
  // END - Get leave history

  // START - Request leave
  async create(req: Request, res: Response, next: NextFunction) {
    const {
      userId,
      description,
      reportingPersonId,
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

    // 2) Update user leave history and reporting person pending leave requests
    try {
      await Promise.all([
        UserModel.updateOne({ _id: userId }, { $push: { leavesHistory: leave._id } }),
        UserModel.updateOne({ _id: reportingPersonId }, { $push: { leavesPendingUserApproval: leave._id } })
      ])
    } catch (ex) {
      logger.error('[CREATE_LEAVE] Failed to save leave to user or reporting person', ex)
      this.deleteLeave(leave._id)
      return this.internalServerError(res)
    }

    return this.ok(res)
  }
  // END - Request leave

  // START - Cancel leave request
  async cancel(req: Request, res: Response, next: NextFunction) {
    const { leaveId, reportingPersonId }: CancelLeaveRequest = req.body
    // 1) Remove leave from reporting person and set leave to cancelled
    try {
      await Promise.all([
        this.removeLeaveFromReportingPerson(reportingPersonId, leaveId),
        this.updateLeaveStatus(leaveId, LeaveStatusEnum.CANCELED)
      ])
    } catch (ex) {
      logger.error('[CANCEL_LEAVE] Failed to cancel leave or remove from reporting person', ex)
      return this.internalServerError(res)
    }
    return this.ok(res)
  }
  // END - Cancel leave request

  // START - Approve leave request
  async approve(req: Request, res: Response, next: NextFunction) {
    const { reportingPersonId, leaveId }: ApproveLeaveRequest = req.body
    // 1) Set leave to approved and remove leave from reporting person
    try {
      await Promise.all([
        this.removeLeaveFromReportingPerson(reportingPersonId, leaveId),
        this.updateLeaveStatus(leaveId, LeaveStatusEnum.APPROVED)
      ])
    } catch (error) {
      logger.error('[APPROVE_LEAVE] Failed to approve leave or remove from reporting person', error)
    }
    return this.ok(res)
  }
  // END - Approve leave request

  // START - Reject leave request
  async reject(req: Request, res: Response, next: NextFunction) {
    const { reportingPersonId, leaveId }: RejectLeaveRequest = req.body
    // 1) Set leave to rejected and remove leave from reporting person
    try {
      await Promise.all([
        this.removeLeaveFromReportingPerson(reportingPersonId, leaveId),
        this.updateLeaveStatus(leaveId, LeaveStatusEnum.REJECTED)
      ])
    } catch (error) {
      logger.error('[REJECT_LEAVE] Failed to reject leave or remove from reporting person', error)
    }
    return this.ok(res)
  }
  // END - Reject leave request
}
