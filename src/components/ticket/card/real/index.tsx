import { formatTime, getFullDayAndMonth, timeFromTo, timeToFrom } from '../../../../lib/date';
import { getBusDirection, getCitiesByTicketTitle, getStationByCity } from '../../../../lib/ticket';
import useLanguage from '../../../../stores/useLanguage';
import Button from '../../../fields/button';
import { TicketCardDash } from '../components/dash';
import { BiPrinter } from "react-icons/bi";
import { RiShareBoxFill } from "react-icons/ri";
import { PiArrowUUpLeftFill } from "react-icons/pi";
import { useWindowSize } from 'usehooks-ts';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { MyTicketSchemaType } from '../../../../schemas/my-ticket';
import { MyTickerUserType } from '../../../../schemas/my-ticket-user';

type RealTicketCardProps = {
    item: MyTicketSchemaType,
    isOutbound?: boolean,
    passenger?: MyTickerUserType,
    returnable?: boolean,
    handlePrint: () => void
}

export default function RealTicketCard({ item, isOutbound, passenger, returnable }: RealTicketCardProps) {
    const { getItem } = useLanguage()
    const { width } = useWindowSize()

    const print = useReactToPrint({
        documentTitle: "Tickets Print",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });
    const contentToPrint = useRef(null);

    const handlePrint = () => {
        print(null, () => contentToPrint.current)
    }


    const ticketIndex = isOutbound ? 0 : 1

    const timeFrom = formatTime(item.tickets[ticketIndex].dateTimeFrom)
    const timeTo = formatTime(item.tickets[ticketIndex].dateTimeTo)

    const [cityFrom, cityTo] = getCitiesByTicketTitle(item.tickets[ticketIndex].title)

    const fullDayAndMonth = getFullDayAndMonth(item.tickets[ticketIndex].dateTimeFrom)

    if (width < 700) {
        return (
            <div className='flex group flex-col transition hover:bg-slate-50 rounded-primary relative overflow-hidden'>
                <div className='flex bg-white relative group-hover:bg-slate-50 flex-col justify-between gap-8 rounded-t-primary flex-1 p-[25px] border-1 border-b-0'>
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='font-medium'>{fullDayAndMonth}</h3>
                            <span className='text-[13px] text-[#6B7280]'>{getStationByCity(cityFrom)}</span>
                        </div>
                        <div className='font-semibold'>#{item.uid}</div>
                    </div>


                    <div className='w-[30px] aspect-square rounded-full border-1 absolute -bottom-[15px] -left-[15px] bg-[#f9fafb] z-[2]' />
                    <div className='w-[30px] aspect-square rounded-full border-1 absolute -bottom-[15px] -right-[15px] bg-[#f9fafb] z-[2]' />
                </div>

                <div className='horizontal-dash' />

                <div className='flex bg-white group-hover:bg-slate-50 flex-col justify-between gap-8 flex-1 p-[25px] border-1 border-t-0'>
                    <div className='flex gap-4 justify-between'>
                        <div className='flex flex-col'>
                            <h2 className='text-[22px] whitespace-nowrap font-semibold'>{timeFrom}</h2>
                            <h3 className='text-[#6B7280]'>{cityFrom}</h3>
                        </div>
                        <div className='pt-4 flex-1'>
                            <TicketCardDash />
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='text-[22px] whitespace-nowrap font-semibold'>{timeTo}</h2>
                            <h3 className='text-[#6B7280]'>{cityTo}</h3>
                        </div>
                    </div>

                    <div className='flex flex-col gap-5'>
                        {passenger && (
                            <div className='flex flex-col'>
                                <div className='text-[13px] text-[#6B7280]'>{getItem("PASSENGER")}</div>
                                <div className='font-semibold'>{passenger.firstName + " " + passenger.lastName}</div>
                            </div>
                        )}

                        <div className='flex gap-[52px]'>
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

                <div className='flex flex-col xs:flex-row bg-white group-hover:bg-slate-50 justify-between gap-4 rounded-b-primary flex-1 p-[25px] border-1 border-t-0'>
                    <Button className='font-semibold w-full' variant='secondary' size='sm' icon={<BiPrinter size={16} />}>{getItem("Print")}</Button>
                    <Button className='font-semibold w-full' variant='secondary' size='sm' icon={<RiShareBoxFill size={16} />}>{getItem("Share")}</Button>
                    <Button disabled={!returnable} className='font-semibold w-full' variant='secondary' size='sm' icon={<PiArrowUUpLeftFill size={16} />}>{getItem("Return")}</Button>
                </div>
            </div>
        )
    }

    return (
        <div ref={contentToPrint} className='flex group transition hover:bg-slate-50 rounded-primary relative overflow-hidden'>
            <div className='flex bg-white group-hover:bg-slate-50 flex-col justify-between gap-8 rounded-l-primary flex-1 p-[25px] border-1 border-r-0'>
                <div className='flex justify-between'>
                    <div className='flex gap-4'>
                        <div className='flex flex-col'>
                            <h2 className='text-[22px] whitespace-nowrap font-semibold'>{timeFrom}</h2>
                            <h3 className='text-[#6B7280]'>{cityFrom}</h3>
                        </div>
                        <div className='pt-4'>
                            <TicketCardDash width={width > 800 ? 120 : 80} />
                        </div>
                        <div className='flex flex-col'>
                            <h2 className='text-[22px] whitespace-nowrap font-semibold'>{timeTo}</h2>
                            <h3 className='text-[#6B7280]'>{cityTo}</h3>
                        </div>
                    </div>

                    <div>
                        <h3 className='font-medium'>{fullDayAndMonth}</h3>
                        <span className='text-[13px] text-[#6B7280]'>{getStationByCity(cityFrom)}</span>
                    </div>
                </div>

                <div className='flex gap-[52px]'>
                    <div className='flex flex-col'>
                        <div className='text-[13px] text-[#6B7280]'>{getItem("Bus")}</div>
                        <div className='font-semibold'>#{item.uid}</div>
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

                <div className='flex h-full flex-col gap-3 justify-evenly px-10 py-[25px] rounded-r-primary vertical-dash border-1 border-l-0 relative'>
                    <Button onClick={handlePrint} className='font-semibold px-3 py-2' variant='secondary' size='sm' icon={<BiPrinter size={16} />}>{getItem("Print")}</Button>
                    <Button className='font-semibold px-3 py-2' variant='secondary' size='sm' icon={<RiShareBoxFill size={16} />}>{getItem("Share")}</Button>
                    <Button disabled={!returnable} className='font-semibold px-3 py-2' variant='secondary' size='sm' icon={<PiArrowUUpLeftFill size={16} />}>{getItem("Return")}</Button>
                </div>
            </div>
        </div>
    )
}
