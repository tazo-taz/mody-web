import RealTicketCard from "."
import { cn } from "../../../../lib/utils"
import { MyTicketSchemaType } from "../../../../schemas/my-ticket"
import useLanguage from "../../../../stores/useLanguage"

export type RealTicketsSection2Props = {
  className?: string,
  ticket: MyTicketSchemaType
}

export default function RealTicketsSection2({ className, ticket: ticketItem, handlePrint }: RealTicketsSection2Props & {
  handlePrint: () => void
}) {
  const { getItem } = useLanguage()
  // const array = [...new Array(ticket.child + ticket.adult)]

  // const passengers = [...ticket.filteredAdultPassengers, ...ticket.filteredChildPassengers]
  const isTicketPast = (new Date().getTime() - new Date(ticketItem.created_at).getTime()) / 1000 > 60 * 10
  return (
    <div className={cn("flex flex-col gap-10", className)}>
      <div className="flex flex-col gap-5">
        <h2 className={cn(
          "text-lg font-semibold",
          "text-[#0E9F6E]",
        )}>{getItem("OUTBOUND")}</h2>

        {ticketItem.passengers.map((passenger, inx) => (
          <RealTicketCard
            passenger={passenger}
            item={ticketItem}
            isOutbound
            returnable={!isTicketPast && ticketItem.status === "succeed"}
            key={inx}
            handlePrint={handlePrint}
          />
        ))}
      </div>

      {ticketItem.tickets[1] && (
        <div className="flex flex-col gap-5">
          <h2 className={cn(
            "text-lg font-semibold",
            "text-[#C27803]",
          )}>{getItem("OUTBOUND")}</h2>

          {ticketItem.passengers.map((passenger, inx) => (
            <RealTicketCard
              passenger={passenger}
              item={ticketItem}
              isOutbound={false}
              returnable={!isTicketPast && ticketItem.status === "succeed"}
              key={inx}
              handlePrint={handlePrint}
            />
          ))}
        </div>
      )}
    </div>
  )
}
