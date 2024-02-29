import RealTicketCard from "."
import { cn } from "../../../../lib/utils"
import { ticketSchemaType } from "../../../../schemas/ticket"
import useLanguage from "../../../../stores/useLanguage"

type RealTicketsSectionProps = {
    className?: string,
    ticket: ticketSchemaType
}

export default function RealTicketsSection({ className, ticket }: RealTicketsSectionProps) {
    const { getItem } = useLanguage()
    const array = [...new Array(ticket.child + ticket.adult)]

    const passengers = [...ticket.filteredAdultPassengers, ...ticket.filteredChildPassengers]

    return (
        <div className={cn("flex flex-col gap-10", className)}>
            <div className="flex flex-col gap-5">
                <h2 className={cn(
                    "text-lg font-semibold",
                    "text-[#0E9F6E]"
                )}>{getItem("OUTBOUND")}</h2>

                {array.map((_, inx) => (
                    <RealTicketCard
                        passenger={passengers[inx]}
                        item={ticket.item}
                        outbound
                        key={inx}
                    />
                ))}
            </div>

            {ticket.returnItem && (
                <div className="flex flex-col gap-5">
                    <h2 className={cn(
                        "text-lg font-semibold",
                        "text-[#C27803]"
                    )}>{getItem("OUTBOUND")}</h2>

                    {array.map((_, inx) => (
                        <RealTicketCard
                            passenger={passengers[inx]}
                            item={ticket.returnItem!}
                            key={inx}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
