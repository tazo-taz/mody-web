import ActiveTicketInfoForTicket from "../../../../../components/ticket/active-ticket-info/ticket";
import { ticketChooseType } from '../../../../../components/ticket/card/simple';
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
    onContinue: () => void,
}

export default function TicketsSearchScreen({ activeOutbound, activeReturn, setActiveOutbound, setActiveReturn, onContinue }: TicketsSearchScreenProsp) {
    const query = useQuery()
    let ticketQuery = parseTicketQuery(query)

    const { getItem } = useLanguage()

    const cityFrom = getCityNameByValue(ticketQuery.cityFrom)
    const cityTo = getCityNameByValue(ticketQuery.cityTo)

    useGrayBg()

    return (
        <>
            <div className='md:block hidden shadow-md z-[1] py-1.5 relative bg-white'>
                <div className='container mx-auto'>
                    <TicketSearchHorizontal className='px-0' />
                </div>
            </div>

            <div className='container mx-auto flex gap-9 md:flex-row flex-col'>
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
                <ActiveTicketInfoForTicket
                    onContinue={onContinue}
                    returnTicket={activeReturn}
                    outboundTicket={activeOutbound}
                />
            </div>
        </>
    )
}
