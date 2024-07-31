import { busSystemDatesType } from "../../../../hooks/firebase/useSearchTickets/types"
import { busDirectionType } from "../../../../lib/ticket"

type metadataType =
  { busDirection: busDirectionType, georgianbus: true } |
  ({ busSystem: true } & busSystemDatesType)

export type ticketChooseType = {
  id: string,
  date: string | Date,
  cityFrom: string,
  cityTo: string,
  metadata: metadataType
}
