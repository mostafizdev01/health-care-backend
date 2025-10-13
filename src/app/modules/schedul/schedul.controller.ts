import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { scheduleServices } from "./schedul.service";
import sendResponse from "../../shared/sendResponse";


const insertIntoDB = catchAsync(async(req:Request, res: Response)=> {
    const result = await scheduleServices.insertIntoDB(req.body);

        sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Schedule created successfully!",
        data: result
    })
})

export const scheduleControllers = {
    insertIntoDB
}