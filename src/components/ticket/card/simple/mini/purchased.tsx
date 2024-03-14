import busImg from "../../../../../assets/images/georgiabusapi.png"
import { getBusDirection, getCitiesByName } from "../../../../../lib/ticket"
import { ticketSchemaType } from "../../../../../schemas/ticket"
import MinifyDate from "../../../minify-date"
import IsUpcoming from "../../components/is-upcoming"
import { TicketCardDash } from "../../components/dash"
import OneWay from "../../components/one-way"

export default function TicketMiniCardPurchased({ item: { busDirectionId, name, date, flightId }, adult, child, returnItem }: ticketSchemaType) {
    const busDirection = getBusDirection(busDirectionId)
    const { cityFrom, cityTo } = getCitiesByName(name)
    const id = flightId
    const passengersCount = adult + child

    if (!busDirection) return null

    return (
        <div className='flex flex-col gap-4 border-1 rounded-primary p-4 transition hover:bg-gray-50'>
            <div className="flex justify-between items-start">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold">{cityFrom}</h4>
                        <TicketCardDash width={77} />
                        <h4 className="text-sm font-semibold">{cityTo}</h4>
                    </div>
                    <MinifyDate date={date} timeDiff={busDirection.timeDiff} className='text-xs text-[#6B7280]' />
                </div>
                <IsUpcoming date />
            </div>

            <div className="flex items-center justify-between">
                <OneWay amount={passengersCount} returnItem={returnItem} />

                <div className="flex items-center gap-1">
                    <img src={busImg} alt='logo' className="h-8" />
                    <span className="text-[11px] text-[#6B7280]">#{id}</span>
                </div>
            </div>
        </div>
    )
}
