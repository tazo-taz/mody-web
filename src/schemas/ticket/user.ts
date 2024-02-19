import { z } from "zod"

const ticketUserSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    userId: z.string(),
    isChild: z.boolean().default(false)
})

export const ticketUsersSchema = z.array(z.object({ ...ticketUserSchema.shape }))

export type ticketUsersSchemaType = z.infer<typeof ticketUsersSchema>