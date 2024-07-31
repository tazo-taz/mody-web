import { z } from "zod";
import { myTicketV0Schema } from "./v0";

const ticketPassengerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  links: z.array(z.string()),
  seats: z.array(z.string())
})

const myTicketV1Schema = z.object({
  ...myTicketV0Schema.shape,
  passengers: z.array(ticketPassengerSchema),
  v: z.literal(1),
})

type MyTicketV1SchemaType = z.infer<typeof myTicketV1Schema>

export { myTicketV1Schema, type MyTicketV1SchemaType };
