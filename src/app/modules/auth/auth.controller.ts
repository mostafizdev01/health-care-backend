import { Request, Response } from "express";
import { authServices } from "./auth.services";
import sendResponse from "../../shared/sendResponse";


const loginPatient = async (req: Request, res: Response) => {
    const result = await authServices.loginPatient(req.body)

    const {accessToken, refreshToken } = result;

    // set token in cookie
    res.cookie("accessToken", accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 *60
    })

        res.cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 90
    })

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User loggedin successfully!",
        data: {
            result
        }
    })
}

export const authControllers = {
    loginPatient
}