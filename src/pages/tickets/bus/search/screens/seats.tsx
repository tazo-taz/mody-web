import { passengerType } from '..'
import BusSeatsSystem from '../../../../../components/seats-system/bus'
import useTab from '../../../../../components/tab/useTab'
import ActiveTicketInfoForTicket from '../../../../../components/ticket/active-ticket-info/ticket'
import { ticketChooseType } from '../../../../../components/ticket/card/simple/type'
import Title from '../../../../../components/title'
import useGrayBg from '../../../../../hooks/useGrayBg'
import useScrollTop from '../../../../../hooks/useScrollTop'
import useLanguage from '../../../../../stores/useLanguage'

type TicketSeatsScreenType = {
    detailsToReviewScreen: () => void
    activeOutbound: ticketChooseType | null
    activeReturn: ticketChooseType | null,
    passengers: passengerType[]
    setPassengers: React.Dispatch<React.SetStateAction<passengerType[]>>,
}

export default function TicketSeatsScreen({
    activeOutbound,
    activeReturn,
    detailsToReviewScreen,
    passengers,
    setPassengers
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
                        activeReturn={activeReturn}
                        seatsIndex={seatsIndex}
                        passengers={passengers}
                        setPassengers={setPassengers}
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
