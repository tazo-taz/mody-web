import { z } from "zod"
import { GenderEnum } from "../types/ticket"

const myTicketUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  gender: z.nativeEnum(GenderEnum).optional(),
})

const myTicketUsersListSchema = z.array(myTicketUserSchema)

type MyTickerUserType = z.infer<typeof myTicketUserSchema>

export { myTicketUserSchema, myTicketUsersListSchema, type MyTickerUserType }