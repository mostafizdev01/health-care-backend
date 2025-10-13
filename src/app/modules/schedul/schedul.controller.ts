import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { scheduleServices } from "./schedul.service";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helper/pick";
import { IJWTPayload } from "../../types/common";


const insertIntoDB = catchAsync(async(req:Request, res: Response)=> {
    const result = await scheduleServices.insertIntoDB(req.body);

        sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Schedule created successfully!",
        data: result
    })
})

// create doctor schedules

const schedulesForDoctor = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const fillters = pick(req.query, ["startDateTime", "endDateTime"])

    const user = req.user;
    const result = await scheduleServices.schedulesForDoctor(user as IJWTPayload, fillters, options);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Schedule fetched successfully!",
        meta: result.meta,
        data: result.data
    })
})

const deleteScheduleFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await scheduleServices.deleteScheduleFromDB(req.params.id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Schedule deleted successfully!",
        data: result
    })
})

export const scheduleControllers = {
    insertIntoDB,
    schedulesForDoctor,
    deleteScheduleFromDB
}