import { getFullDayAndMonth, timeFromTo, timeToFrom } from '../../../../lib/date';
import { getBusDirection, getCitiesByName, getStationByCity } from '../../../../lib/ticket';
import { ticketItemSchemaType } from '../../../../schemas/ticket';
import { ticketUserSchemaType } from '../../../../schemas/ticket/user';
import useLanguage from '../../../../stores/useLanguage';
import Button from '../../../fields/button';
import { TicketCardDash } from '../components/dash';
import { BiPrinter } from "react-icons/bi";
import { RiShareBoxFill } from "react-icons/ri";
import { PiArrowUUpLeftFill } from "react-icons/pi";

type RealTicketCardProps = {
    item: ticketItemSchemaType,
    outbound?: boolean,
    passenger?: ticketUserSchemaType
}

export default function RealTicketCard({ item, outbound, passenger }: RealTicketCardProps) {
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

    return (
        <div className='flex group transition hover:bg-slate-50 rounded-primary relative overflow-hidden'>
            <div className='flex bg-white group-hover:bg-slate-50 flex-col justify-between gap-8 rounded-l-primary flex-1 p-[25px] border-1 border-r-0'>
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

            <div className='bg-white group-hover:bg-slate-50 relative'>
                <div className='w-[30px] aspect-square rounded-full border-1 absolute -top-[15px] -left-[15px] bg-[#f9fafb] z-[2]' />
                <div className='w-[30px] aspect-square rounded-full border-1 absolute -bottom-[15px] -left-[15px] bg-[#f9fafb] z-[2]' />

                <div className='flex flex-col gap-3 justify-evenly px-10 py-[25px] rounded-r-primary vertical-dash border-1 border-l-0 relative'>
                    <Button className='font-semibold px-3 py-2' variant='secondary' size='sm' icon={<BiPrinter size={16} />}>{getItem("Print")}</Button>
                    <Button className='font-semibold px-3 py-2' variant='secondary' size='sm' icon={<RiShareBoxFill size={16} />}>{getItem("Share")}</Button>
                    <Button className='font-semibold px-3 py-2' variant='secondary' size='sm' icon={<PiArrowUUpLeftFill size={16} />}>{getItem("Return")}</Button>
                </div>
            </div>
        </div>
    )
}
