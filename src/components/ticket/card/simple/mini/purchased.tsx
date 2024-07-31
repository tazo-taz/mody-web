import busImg from "../../../../../assets/images/georgiabusapi.png"
import { getBusDirection, getCitiesByTicketTitle } from "../../../../../lib/ticket"
import MinifyDate from "../../../minify-date"
import IsUpcoming from "../../components/is-upcoming"
import { TicketCardDash } from "../../components/dash"
import OneWay from "../../components/one-way"
import { MyTicketSchemaType } from "../../../../../schemas/my-ticket"

export default function TicketMiniCardPurchased({ tickets, passengers, uid }: MyTicketSchemaType) {
    const [cityFrom, cityTo] = getCitiesByTicketTitle(tickets[0].title)
    const id = uid
    const passengersCount = passengers.length

    return (
        <div className='flex flex-col gap-4 border-1 rounded-primary p-4 transition hover:bg-gray-50'>
            <div className="flex justify-between items-start">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold">{cityFrom}</h4>
                        <TicketCardDash width={77} />
                        <h4 className="text-sm font-semibold">{cityTo}</h4>
                    </div>
                    <MinifyDate
                        date={tickets[0].dateTimeFrom}
                        timeFrom={tickets[0].dateTimeFrom}
                        timeTo={tickets[0].dateTimeTo}
                        className='text-xs text-[#6B7280]'
                    />
                </div>
                <IsUpcoming date />
            </div>

            <div className="flex items-center justify-between">
                <OneWay
                    amount={passengersCount}
                    isTwoWay={tickets.length > 1}
                />

                <div className="flex items-center gap-1">
                    <img src={busImg} alt='logo' className="h-8" />
                    <span className="text-[11px] text-[#6B7280]">#{id}</span>
                </div>
            </div>
        </div>
    )
}
