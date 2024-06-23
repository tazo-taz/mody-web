import { passengerType, screenEnum } from '..'
import BusSeatsSystem from '../../../../../components/seats-system/bus'
import ActiveTicketInfoForTicket from '../../../../../components/ticket/active-ticket-info/ticket'
import { ticketChooseType } from '../../../../../components/ticket/card/simple/type'
import Title from '../../../../../components/title'
import useTicketUsers from '../../../../../hooks/firebase/useTicketUsers'
import useGrayBg from '../../../../../hooks/useGrayBg'
import useScrollTop from '../../../../../hooks/useScrollTop'
import { objChange } from '../../../../../lib/utils'
import useLanguage from '../../../../../stores/useLanguage'

type TicketSeatsScreenType = {
    setScreen: (screen: screenEnum) => void
    detailsToReviewScreen: () => boolean
    activeOutbound: ticketChooseType | null
    activeReturn: ticketChooseType | null,
    adultPassengers: passengerType[],
    childPassengers: passengerType[],
    setChildPassengers: React.Dispatch<React.SetStateAction<passengerType[]>>,
    setAdultPassengers: React.Dispatch<React.SetStateAction<passengerType[]>>,
    setActiveSeats: React.Dispatch<React.SetStateAction<string[]>>,
    activeSeats: string[]
}

export default function TicketSeatsScreen({
    activeOutbound,
    activeReturn,
    detailsToReviewScreen,
    activeSeats,
    setActiveSeats
}: TicketSeatsScreenType) {
    const { getItem } = useLanguage()

    useGrayBg()
    useScrollTop()

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


                    <div className='flex flex-col gap-[25px]'>
                        <BusSeatsSystem
                            activeOutbound={activeOutbound}
                            activeSeats={activeSeats}
                            setActiveSeats={setActiveSeats}
                        />
                    </div>
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
