import { getFullDayAndMonth, timeFromTo, timeToFrom } from '../../../../lib/date';
import { getBusDirection, getCitiesByName, getStationByCity } from '../../../../lib/ticket';
import { ticketItemSchemaType } from '../../../../schemas/ticket';
import { ticketUserSchemaType } from '../../../../schemas/ticket/user';
import useLanguage from '../../../../stores/useLanguage';
import { TicketCardDash } from '../components/dash';

type RealTicketCardProps = {
    item: ticketItemSchemaType,
    outbound?: boolean,
    passenger?: ticketUserSchemaType
}

export default function RealTicketCard({ item, outbound, passenger }: RealTicketCardProps) {
    console.log(passenger);
    const { getItem } = useLanguage()
    const busDirection = getBusDirection(item.busDirectionId)
    if (!busDirection) return null
    let timeFrom = "", timeTo = ""

    if (outbound) {
        const x = timeFromTo(item.date, busDirection.timeDiff, false)
        timeFrom = x.timeFrom
        timeTo = x.timeTo

    } else {
        const x = timeToFrom(item.date, busDirection.timeDiff, false)
        timeFrom = x.timeFrom
        timeTo = x.timeTo

    }

    const { cityFrom, cityTo } = getCitiesByName(item.name)

    const gullDayAndMonth = getFullDayAndMonth(item.date)
    console.log(gullDayAndMonth);


    return (
        <div className='bg-white transition hover:bg-slate-50 rounded-primary border-1 p-[25px]'>
            <div className='flex flex-col gap-8'>
                <div className='flex justify-between'>
                    <div className='flex gap-4'>
                        <div className='flex flex-col'>
                            <h2 className='text-[22px] font-semibold'>{timeFrom}</h2>
                            <h3 className='text-[#6B7280]'>{cityFrom}</h3>
                        </div>
                        <div className='pt-4'>
                            <TicketCardDash width={120} />
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='text-[22px] font-semibold'>{timeTo}</h2>
                            <h3 className='text-[#6B7280]'>{cityTo}</h3>
                        </div>
                    </div>

                    <div>
                        <h3 className='font-medium'>{gullDayAndMonth}</h3>
                        <span className='text-[13px] text-[#6B7280]'>{getStationByCity(cityFrom)}</span>
                    </div>
                </div>

                <div className='flex gap-[52px]'>
                    <div className='flex flex-col'>
                        <div className='text-[13px] text-[#6B7280]'>{getItem("Bus")}</div>
                        <div className='font-semibold'>#{item.flightId}</div>
                    </div>

                    {passenger && (
                        <div className='flex flex-col'>
                            <div className='text-[13px] text-[#6B7280]'>{getItem("PASSENGER")}</div>
                            <div className='font-semibold'>{passenger.firstName + " " + passenger.lastName}</div>
                        </div>
                    )}

                    <div className='flex flex-col'>
                        <div className='text-[13px] text-[#6B7280]'>{getItem("CLASS")}</div>
                        <div className='font-semibold'>1</div>
                    </div>

                    <div className='flex flex-col'>
                        <div className='text-[13px] text-[#6B7280]'>{getItem("SECTION")}</div>
                        <div className='font-semibold'>{getItem("Storey_1")}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
