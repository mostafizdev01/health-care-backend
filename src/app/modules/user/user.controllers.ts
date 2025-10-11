import { NextFunction, Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import { userServices } from "./user.services";
import catchAsync from "../../shared/catchAsync";


const createUser = catchAsync(async (req: Request, res: Response) => {

    const result = await userServices.createUser(req)
    console.log(result);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created successfully",
        data: result
    })
})

// create admin
const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.createAdmin(req)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Admin created successfully",
        data: result
    })
})

// create doctor
const createDoctor = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.createDoctor(req)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Doctor created successfully",
        data: result
    })
})

// getAll users

const getAllUsers = async (req: Request, res: Response) => {
    const result = await userServices.getAllUsers();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All User Get successfully",
        data: result
    })
}

export const userControllers = {
    createUser,
    createAdmin,
    getAllUsers,
    createDoctor
}