import useQuery from '../../hooks/useQuery'
import { calculateTicketsFullPrice, parseTicketQuery } from '../../lib/ticket'
import { cn } from '../../lib/utils'
import useLanguage from '../../stores/useLanguage'
import { ticketChooseType } from './card/simple/type'

type TicketsFullPriceProps = {
    outboundTicket: ticketChooseType | null
    returnTicket: ticketChooseType | null
    className?: string
}

export default function TicketsFullPrice({ outboundTicket, returnTicket, className }: TicketsFullPriceProps) {
    const { getItem } = useLanguage()
    const { child, passenger } = parseTicketQuery(useQuery())

    const passengersCount = child + passenger

    let price1 = 0;
    let price2 = 0;

    if (outboundTicket && "busSystem" in outboundTicket?.metadata) {
        price1 = outboundTicket?.metadata.price_one_way
    } else if (outboundTicket && "georgianbus" in outboundTicket?.metadata && outboundTicket?.metadata.busDirection) {
        price1 = outboundTicket?.metadata.busDirection.price || 0
    }

    if (returnTicket && "busSystem" in returnTicket?.metadata) {
        price2 = returnTicket?.metadata.price_one_way
    } else if (returnTicket && "georgianbus" in returnTicket?.metadata && returnTicket?.metadata.busDirection) {
        price2 = returnTicket?.metadata.busDirection.price || 0
    }

    const { serviceFee, ticketsPrice, totalPrice, discountPrice, discount } = calculateTicketsFullPrice(passengersCount, price1, price2)

    const items = [
        {
            left: getItem("Tickets") + ' ( ' + passengersCount + " " + getItem(passengersCount > 1 ? "Passengers" : "Passenger"),
            right: "₾ " + ticketsPrice
        },
        {
            left: getItem("Service_fee"),
            right: "₾ " + serviceFee
        },
        {
            left: getItem("Discount") + ` (${discount}%)`,
            right: "₾ " + discountPrice,
            green: true
        },
        {
            left: getItem("Total"),
            right: "₾ " + totalPrice,
            bold: true
        },
    ]

    return (
        <div className={cn('bg-[#F9FAFB] rounded-primary p-4 text-[13px] flex flex-col gap-3', className)}>
            {items.map(({ left, right, green, bold }, inx) => (
                <div key={inx} className={cn(
                    'flex justify-between items-center',
                    green && "text-[#0E9F6E]",
                    bold && "text-[16px] font-bold"
                )}>
                    <p>{left}</p>
                    <p>{right}</p>
                </div>
            ))}
        </div>
    )
}
