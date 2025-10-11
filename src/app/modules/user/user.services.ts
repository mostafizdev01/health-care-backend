import { Request } from "express";
import config from "../../../config";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../helper/fileUpload";

const createUser = async (req:Request) => {
    // console.log(req.file)

    if(req.file){
        const uploadResult = await fileUploader.uploadToCloudinary(req.file);
        req.body.patient.profilePhoto = uploadResult?.secure_url;
    }

    const hashPassword = await bcrypt.hash(req.body.password, Number(config.BCRYPT_SOLD_ROUND));

    const result = await prisma.$transaction(async (tnx) => {
        await tnx.user.create({
            data: {
                email: req.body.patient.email,
                password: hashPassword
            }
        });

        return await tnx.patient.create({
            data: req.body.patient
        })
    })

    return result;
}

const getAllUsers = async ()=> {
    const result = await prisma.user.findMany();
    return result
}

export const userServices = {
    createUser,
    getAllUsers
}