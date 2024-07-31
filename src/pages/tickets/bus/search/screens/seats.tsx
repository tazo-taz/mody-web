import { passengerType } from '..'
import BusSeatsSystem from '../../../../../components/seats-system/bus'
import useTab from '../../../../../components/tab/useTab'
import ActiveTicketInfoForTicket from '../../../../../components/ticket/active-ticket-info/ticket'
import { ticketChooseType } from '../../../../../components/ticket/card/simple/type'
import Title from '../../../../../components/title'
import useGrayBg from '../../../../../hooks/useGrayBg'
import useScrollTop from '../../../../../hooks/useScrollTop'
import { doesTicketsHasSeatsPlan, isBothActiveTicketsBusSystem, isBusSystemApi } from '../../../../../lib/ticket'
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

    let busSystemTicket = activeOutbound

    const [ticketsHasSeats, ticket1HasSeats, ticket2HasSeats] = doesTicketsHasSeatsPlan(activeOutbound, activeReturn)

    if (!ticketsHasSeats) {
        throw new Error("Something went wrong, please contact us")
    }

    if (ticket1HasSeats && ticket2HasSeats) {
        busSystemTicket = seatsIndex === 0 ? activeOutbound : activeReturn
    } else if (ticket1HasSeats) {
        busSystemTicket = activeOutbound
    } else if (ticket2HasSeats) {
        busSystemTicket = activeReturn
    }

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

                    {ticket1HasSeats && ticket2HasSeats && (<>
                        {seatsTab()}
                        <br />
                    </>)}
                    <BusSeatsSystem
                        ticket={busSystemTicket}
                        seatsIndex={seatsIndex}
                        passengers={passengers}
                        setPassengers={setPassengers}
                    />
                </div>
                <ActiveTicketInfoForTicket
                    outboundTicket={activeOutbound}
                    returnTicket={activeReturn}
                    onContinue={detailsToReviewScreen}
                    passengers={passengers}
                />
            </div>
        </>
    )
}
