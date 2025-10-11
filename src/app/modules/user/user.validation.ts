import z, { email } from "zod";


const createPatientValidationSchema = z.object({
    password: z.string(),
    patient: z.object({
        name: z.string().nonempty("Name is required"),
        email: z.string().nonempty("Email is required"),
        address: z.string().optional()
    })
})

const createAdminValidationSchema = z.object({
    password: z.string({
        error: "password is required!"
    }),
    admin: z.object({
        name: z.string({
            error: "Name is required!"
        }),
        email: z.string({
            error: "email is required!"
        }),
        contactNumber: z.string({
            error: "contact number is required!"
        }),
    })
})

export const UserValidation = {
    createPatientValidationSchema,
    createAdminValidationSchema
}