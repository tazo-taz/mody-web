import { z } from "zod"


export const cardSchema = z.object({
    cardMask: z.string(),
    expiryDate: z.string(),
    recId: z.string(),
})


export const cardsSchema = z.array(z.object({
    cardMask: z.string(),
    expiryDate: z.string(),
    recId: z.string(),
}))

export type cardSchemaType = z.infer<typeof cardSchema>

export type cardsSchemaType = z.infer<typeof cardsSchema>