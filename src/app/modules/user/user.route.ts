import { NextFunction, Request, Response, Router } from "express";
import { userControllers } from "./user.controllers";
import { fileUploader } from "../../helper/fileUpload";
import { UserValidation } from "./user.validation";


const route = Router();

route.post("/create-patient",
    fileUploader.upload.single("file"), /// form data er mordhe file name er morhe image ta astese
    (req:Request, res:Response, next:NextFunction)=> {
        req.body = UserValidation.createPatientValidationSchema.parse(JSON.parse(req.body.data)) // req.body.data er morhe data gula astese
       return userControllers.createUser(req, res, next)
    },
)

// create amdin
route.post("/create-admin",
    fileUploader.upload.single("file"), /// form data er mordhe file name er morhe image ta astese
    (req:Request, res:Response, next:NextFunction)=> {
        req.body = UserValidation.createAdminValidationSchema.parse(JSON.parse(req.body.data)) // req.body.data er morhe data gula astese
       return userControllers.createAdmin(req, res, next)
    },
)

// create doctor
route.post("/create-doctor",
    fileUploader.upload.single("file"), /// form data er mordhe file name er morhe image ta astese
    (req:Request, res:Response, next:NextFunction)=> {
        req.body = UserValidation.createDoctorValidationSchema.parse(JSON.parse(req.body.data)) // req.body.data er morhe data gula astese
       return userControllers.createDoctor(req, res, next)
    },
)

route.get("/", userControllers.getAllUsers)
export const userRoutes = route;