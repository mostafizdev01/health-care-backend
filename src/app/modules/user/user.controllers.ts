import { Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import { userServices } from "./user.services";


const createUser = async (req:Request, res:Response)=> {
    const result = await userServices.createUser(req.body)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created successfully",
        data: result
    })
}

export const userControllers = {
    createUser
}