import { z } from "zod"

const itemSchema = z.object({
    amount: z.number(),
    busDirectionId: z.number(),
    bus_arrival: z.coerce.date(),
    bus_departure: z.coerce.date(),
    date: z.coerce.date(),
    flightId: z.string(),
    name: z.string(),
    price_adult: z.number(),
    price_child: z.number(),
})

export const ticketSchema = z.object({
    adult: z.number(),
    child: z.number(),
    created_at: z.coerce.date(),
    qrCodeLink: z.string(),
    transactionId: z.string(),
    requestId: z.string(),

    item: itemSchema,
    returnItem: itemSchema.nullable()
})

export const ticketsListSchema = z.array(ticketSchema)



export type ticketSchemaType = z.infer<typeof ticketSchema>

export type ticketsListSchemaType = z.infer<typeof ticketsListSchema>