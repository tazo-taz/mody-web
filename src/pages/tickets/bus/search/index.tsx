import { useState } from 'react';
import tbilisBatumiSrc from "../../../../assets/images/maps/tbilisi-batumi.png";
import TicketsSection from '../../../../components/ticket/section';
import TicketSearchHorizontal from '../../../../components/ticket/ticket-search-horizontal';
import useQuery from '../../../../hooks/useQuery';
import { getCityNameByValue, parseTicketQuery } from '../../../../lib/ticket';
import useLanguage from '../../../../stores/useLanguage';
import { ticketChooseType } from '../../../../components/ticket/card';
import ActiveTicketInfo from '../../../../components/ticket/active-ticket-info';

export default function BusTicketsSearchPage() {
    const query = useQuery()
    let ticketQuery = parseTicketQuery(query)

    ticketQuery.departureDate ||= new Date()

    const { getItem } = useLanguage()

    const [activeOutbound, setActiveOutbound] = useState<ticketChooseType | null>(null)
    const [activeReturn, setActiveReturn] = useState<ticketChooseType | null>(null)

    const cityFrom = getCityNameByValue(ticketQuery.cityFrom)
    const cityTo = getCityNameByValue(ticketQuery.cityTo)

    return (
        <>
            <div className='shadow-md py-5'>
                <div className='container mx-auto'>
                    <TicketSearchHorizontal className='px-0' />
                </div>
            </div>
            <div className='bg-[#F9FAFB]'>
                <div className='container mx-auto flex gap-9'>
                    <div className='flex-1'>
                        <TicketsSection
                            title={getItem("Select_Outbound")}
                            cityFrom={cityFrom}
                            cityTo={cityTo}
                            dateFrom={ticketQuery.departureDate}
                            onChoose={(data) => setActiveOutbound(data)}
                            activeDate={activeOutbound}
                        />
                        {ticketQuery.returnDate && (
                            <TicketsSection
                                title={getItem("Select_Outbound")}
                                cityFrom={cityTo}
                                cityTo={cityFrom}
                                dateFrom={ticketQuery.returnDate}
                                onChoose={(data) => setActiveReturn(data)}
                                activeDate={activeReturn}
                            />
                        )}
                    </div>
                    <div className='h-[655px] max-w-[500px] px-5 bg-[#F3F4F6] border-[#E5E7EB] border-1 flex items-center justify-center sticky top-5'>
                        <img src={tbilisBatumiSrc} alt='map' className='w-full' />
                        <ActiveTicketInfo
                            className='absolute top-3 left-3 right-3 z-[1]'
                            outboundTicket={activeOutbound}
                            returnTicket={activeReturn}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
