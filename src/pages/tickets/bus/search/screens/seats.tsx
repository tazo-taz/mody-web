import { passengerType, screenEnum } from '..'
import BusSeatsSystem from '../../../../../components/seats-system/bus'
import useTab from '../../../../../components/tab/useTab'
import ActiveTicketInfoForTicket from '../../../../../components/ticket/active-ticket-info/ticket'
import { ticketChooseType } from '../../../../../components/ticket/card/simple/type'
import Title from '../../../../../components/title'
import useGrayBg from '../../../../../hooks/useGrayBg'
import useScrollTop from '../../../../../hooks/useScrollTop'
import useLanguage from '../../../../../stores/useLanguage'

type TicketSeatsScreenType = {
    setScreen: (screen: screenEnum) => void
    detailsToReviewScreen: () => void
    activeOutbound: ticketChooseType | null
    activeReturn: ticketChooseType | null,
    setActiveOutboundSeats: React.Dispatch<React.SetStateAction<(string | undefined)[]>>,
    activeOutboundSeats: (string | undefined)[]
    activeReturnSeats: (string | undefined)[]
    setActiveReturnSeats: React.Dispatch<React.SetStateAction<(string | undefined)[]>>,
}

export default function TicketSeatsScreen({
    activeOutbound,
    activeReturn,
    detailsToReviewScreen,
    activeOutboundSeats,
    setActiveOutboundSeats,
    activeReturnSeats,
    setActiveReturnSeats
}: TicketSeatsScreenType) {
    const { getItem } = useLanguage()

    useGrayBg()
    useScrollTop()

    // console.log(activeSeats, activeOutbound);

    const { Tab: seatsTab, index: seatsIndex } = useTab({
        nav: ["Outbound seats", "Return seats"],
        itemClassName: "py-2"
    })

    return (
        <>
            <div className='container mx-auto flex gap-7 lg:gap-[60px] xl:gap-[120px]'>
                <div className='flex-1'>
                    <Title>
                        <div className='flex justify-between items-center'>

                            {getItem("Seat_Reservation")}
                            <span className='text-xs text-[#6B7280] font-normal'>
                                {getItem("Available_seats")}:&nbsp;
                                <span className='text-primary'>10</span>
                            </span>
                        </div>
                    </Title>

                    {activeReturn && "busSystem" in activeReturn.metadata && (<>
                        {seatsTab()}
                        <br />
                    </>)}
                    <BusSeatsSystem
                        activeOutbound={activeOutbound}
                        activeOutboundSeats={activeOutboundSeats}
                        setActiveOutboundSeats={setActiveOutboundSeats}
                        activeReturnSeats={activeReturnSeats}
                        setActiveReturnSeats={setActiveReturnSeats}
                        activeReturn={activeReturn}
                        seatsIndex={seatsIndex}
                    />
                </div>
                <ActiveTicketInfoForTicket
                    outboundTicket={activeOutbound}
                    returnTicket={activeReturn}
                    onContinue={detailsToReviewScreen}
                />
            </div>
        </>
    )
}
