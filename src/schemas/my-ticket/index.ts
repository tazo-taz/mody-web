import { z } from "zod";
import { myTicketV1Schema, MyTicketV1SchemaType } from "./versions/v1";
import { myTicketV0Schema, MyTicketV0SchemaType } from "./versions/v0";

const myTicketSchema = z.union([myTicketV0Schema, myTicketV1Schema]);

const myTicketsListSchema = z.array(myTicketSchema);

type MyTicketSchemaType = MyTicketV1SchemaType | MyTicketV0SchemaType;

export { myTicketSchema, myTicketsListSchema, type MyTicketSchemaType };