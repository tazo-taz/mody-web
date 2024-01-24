import { z } from "zod"
import { getLanguageItem } from "../assets/language"


export const unregisteredUserSchema = z.object({
    firstName: z.string().min(1, { message: (getLanguageItem("First_name")) }),
    lastName: z.string().min(1, { message: (getLanguageItem("Last_name")) }),
    phoneNumber: z.string().min(1, { message: (getLanguageItem("Phone_number")) }),
    userId: z.string().min(1, { message: (getLanguageItem("ID_Number")) }),
    email: z.string().optional().nullable(),
})

export const userSchema = z.object({
    ...unregisteredUserSchema.shape,
    uid: z.string(),
})



export type unregisteredUserSchemaType = z.infer<typeof unregisteredUserSchema>

export type userSchemaType = z.infer<typeof userSchema>