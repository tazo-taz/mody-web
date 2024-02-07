import React from 'react'
import useLanguage from '../../stores/useLanguage'
import { calculateTicketsFullPrice, parseTicketQuery } from '../../lib/ticket'
import useQuery from '../../hooks/useQuery'
import { ticketChooseType } from './card'
import { cn } from '../../lib/utils'

type TicketsFullPriceProps = {
    outboundTicket: ticketChooseType | null
    returnTicket: ticketChooseType | null
    className?: string
}

export default function TicketsFullPrice({ outboundTicket, returnTicket, className }: TicketsFullPriceProps) {
    const { getItem } = useLanguage()
    const { child, passenger } = parseTicketQuery(useQuery())

    const passengersCount = child + passenger

    const discountPercentage = 0
    const { serviceFee, ticketsPrice, totalPrice, discountPrice } = calculateTicketsFullPrice(passengersCount, outboundTicket?.busDirection?.price, returnTicket?.busDirection?.price, discountPercentage)

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
            left: getItem("Discount") + ` (${discountPercentage}%)`,
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
