import { z } from "zod"
import { TicketApiEnum } from "../../../types/ticket";

const baseItemSchema = z.object({
  dateTimeFrom: z.coerce.date(),
  dateTimeTo: z.coerce.date(),
  link: z.string(),
  title: z.string(),
  totalPrice: z.coerce.string(),
  type: z.nativeEnum(TicketApiEnum),
})

const busSystemItemSchema = z.object({
  type: z.literal(TicketApiEnum.BUS_SYSTEM),
  metadata: z.object({
    order_id: z.number().int(),
  }),
})

const georgianBusItemSchema = z.object({
  type: z.literal(TicketApiEnum.GEORGIAN_BUS),
  metadata: z.object({
    requestId: z.string(),
  }),
})

const mergedBusSystemSchema = baseItemSchema.merge(busSystemItemSchema);
const mergedGeorgianBusSchema = baseItemSchema.merge(georgianBusItemSchema);

const itemSchema = z.union([mergedBusSystemSchema, mergedGeorgianBusSchema]);

const ticketPassengerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  links: z.array(z.string()),
  seat: z.array(z.string())
})

const myTicketV0Schema = z.object({
  created_at: z.coerce.date(),
  passengers: z.array(ticketPassengerSchema),
  status: z.enum(["pending", "succeed"]),
  tickets: z.array(itemSchema),
  uid: z.string(),
  v: z.literal(0),
})


type MyTicketV0SchemaType = z.infer<typeof myTicketV0Schema>

export { myTicketV0Schema, type MyTicketV0SchemaType }