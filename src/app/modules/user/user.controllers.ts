import { NextFunction, Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import { userServices } from "./user.services";
import catchAsync from "../../shared/catchAsync";


const createUser = catchAsync(async (req:Request, res:Response)=> {
    
    const result = await userServices.createUser(req)
    console.log(result);
    
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created successfully",
        data: result
    })
})

export const userControllers = {
    createUser
}