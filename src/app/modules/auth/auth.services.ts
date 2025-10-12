import { UserStatus } from "@prisma/client"
import { prisma } from "../../shared/prisma"
import bcrypt from "bcryptjs";
import { email } from "zod";
import { JwtHelper } from "../../helper/jwtHelper";

const loginPatient = async (payload:{email:string, password: string})=> {
    const user = await prisma.user.findFirstOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    })

    const isCorrectPassword = await bcrypt.compare(payload.password, user.password)

      if (!isCorrectPassword) {
        throw new Error("Password is incorrect!")
    }

    // create access token

    const accessToken = JwtHelper.generateToken({email:user.email, role: user.role}, "asdf", "1h")
    const refreshToken = JwtHelper.generateToken({email:user.email, role: user.role}, "asdfjkl", "90d")

    return {
        accessToken,
        refreshToken,
        user,
    };
}

export const authServices = {
    loginPatient
}