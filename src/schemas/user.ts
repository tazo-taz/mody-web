import { z } from "zod"
import { getItem } from "../assets/language"


export const unregisteredUserSchema = z.object({
    firstName: z.string().min(1, { message: (getItem("First_name")) }),
    lastName: z.string().min(1, { message: (getItem("Last_name")) }),
    phoneNumber: z.string().min(1, { message: (getItem("Phone_number")) }),
    userId: z.string().min(1, { message: (getItem("ID_Number")) }).nullable(),
    email: z.string().optional().nullable(),
})

export const userSchema = z.object({
    ...unregisteredUserSchema.shape,
    uid: z.string(),
})



export type unregisteredUserSchemaType = z.infer<typeof unregisteredUserSchema>

export type userSchemaType = z.infer<typeof userSchema>