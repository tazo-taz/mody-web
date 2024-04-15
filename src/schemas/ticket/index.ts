import { z } from "zod"
import { ticketUsersSchema } from "./user"

const orderItem = z.object({
    amount: z.number(),
    bus_arrival: z.string(),
    bus_departure: z.coerce.date(),
    name: z.string(),
    price_adult: z.number(),
    price_child: z.number(),
})

const itemSchema = z.object({
    busDirectionId: z.coerce.number(),
    date: z.coerce.date(),
    flightId: z.string(),
    orderItem: orderItem,
})

export type ticketItemSchemaType = z.infer<typeof itemSchema>


export const myTicketSchema = z.object({
    created_at: z.coerce.date(),
    uid: z.string(),
    filteredChildPassengers: ticketUsersSchema.optional().default([]),
    filteredAdultPassengers: ticketUsersSchema.optional().default([]),
    status: z.enum(["pending", "succeed"]),
    item: itemSchema,
    returnItem: itemSchema.nullable(),
    adult: z.coerce.number(),
    child: z.coerce.number(),
})

export const ticketsListSchema = z.array(myTicketSchema)

export type ticketSchemaType = z.infer<typeof myTicketSchema>

export type ticketsListSchemaType = z.infer<typeof ticketsListSchema>