import config from "../../../config";
import { prisma } from "../../shared/prisma";
import { createPatientInput } from "./user.interface";
import bcrypt from "bcryptjs";

const createUser = async (payload: createPatientInput) => {

    const hashPassword = await bcrypt.hash(payload.password, Number(config.BCRYPT_SOLD_ROUND));

    const result = await prisma.$transaction(async (tnx) => {
        await tnx.user.create({
            data: {
                email: payload.email,
                password: hashPassword
            }
        });

        return await tnx.patient.create({
            data: {
                name: payload.name,
                email: payload.email
            }
        })
    })

    return result;
}

export const userServices = {
    createUser
}