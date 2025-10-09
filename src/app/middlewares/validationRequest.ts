import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";


export const validationRequest = (schema: ZodObject)=> async (req:Request, res:Response, next:NextFunction)=>{
    try {
        await schema.parseAsync({
            body: req.body
        })
        return next();
    } catch (error) {
        next(error)
    }
}