import { Request } from "express";
import config from "../../../config";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../helper/fileUpload";

const createUser = async (req:Request) => {
    // console.log(req.file)

    if(req.file){
        const uploadResult = await fileUploader.uploadToCloudinary(req.file);
        console.log(uploadResult);
        
    }

    const hashPassword = await bcrypt.hash(req.body.patient.password, Number(config.BCRYPT_SOLD_ROUND));

    // const result = await prisma.$transaction(async (tnx) => {
    //     await tnx.user.create({
    //         data: {
    //             email: payload.email,
    //             password: hashPassword
    //         }
    //     });

    //     return await tnx.patient.create({
    //         data: {
    //             name: payload.name,
    //             email: payload.email
    //         }
    //     })
    // })

    return "result";
}

export const userServices = {
    createUser
}