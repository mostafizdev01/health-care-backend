import { Request } from "express";
import config from "../../../config";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../helper/fileUpload";
import { Admin, UserRole } from "@prisma/client";

const createUser = async (req: Request) => {
    // console.log(req.file)

    if (req.file) {
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

/// create Admin
const createAdmin = async (req: Request): Promise<Admin> => {  // promise => admin type er data dibe. amdin create hoile. attokkhon wait korte hobe. promise => mane ami jodi tomake data dei taile admin type er data dibo.
    const file = req.file;

    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
        req.body.admin.profilePhoto = uploadToCloudinary?.secure_url
    }

    const hashPassword: string = await bcrypt.hash(req.body.password, Number(config.BCRYPT_SOLD_ROUND))

    const userData = {
        email: req.body.admin.email,
        password: hashPassword,
        role: UserRole.ADMIN
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.user.create({
            data: userData
        })

        const createdAdminData = await transactionClient.admin.create({
            data: req.body.admin
        })
        return createdAdminData
    })

    return result
}

const getAllUsers = async () => {
    const result = await prisma.user.findMany();
    return result
}

export const userServices = {
    createUser,
    createAdmin,
    getAllUsers
}