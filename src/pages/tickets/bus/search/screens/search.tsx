import tbilisBatumiSrc from "../../../../../assets/images/maps/tbilisi-batumi.png";
import ActiveTicketInfo from '../../../../../components/ticket/active-ticket-info';
import { ticketChooseType } from '../../../../../components/ticket/card/card';
import TicketsSection from '../../../../../components/ticket/section';
import TicketSearchHorizontal from '../../../../../components/ticket/ticket-search-horizontal';
import useGrayBg from "../../../../../hooks/useGrayBg";
import useQuery from '../../../../../hooks/useQuery';
import { getCityNameByValue, parseTicketQuery } from '../../../../../lib/ticket';
import useLanguage from '../../../../../stores/useLanguage';

type TicketsSearchScreenProsp = {
    activeOutbound: ticketChooseType | null,
    setActiveOutbound: React.Dispatch<React.SetStateAction<ticketChooseType | null>>,
    activeReturn: ticketChooseType | null,
    setActiveReturn: React.Dispatch<React.SetStateAction<ticketChooseType | null>>,
    onContinue: () => void
}

export default function TicketsSearchScreen({ activeOutbound, activeReturn, setActiveOutbound, setActiveReturn, onContinue }: TicketsSearchScreenProsp) {
    const query = useQuery()
    let ticketQuery = parseTicketQuery(query)

    ticketQuery.departureDate ||= new Date()

    const { getItem } = useLanguage()

    const cityFrom = getCityNameByValue(ticketQuery.cityFrom)
    const cityTo = getCityNameByValue(ticketQuery.cityTo)

    useGrayBg()

    return (
        <>
            <div className='shadow-md z-[1] py-1.5 relative bg-white'>
                <div className='container mx-auto'>
                    <TicketSearchHorizontal className='px-0' />
                </div>
            </div>
            <div>
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
                            className='absolute top-5 left-1/2 -translate-x-1/2 z-[1] w-full max-w-[460px]'
                            outboundTicket={activeOutbound}
                            returnTicket={activeReturn}
                            onContinue={onContinue}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
