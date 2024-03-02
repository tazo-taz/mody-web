import ChevronRight from '../../assets/images/svgs/icons/chevron/chevron-right'
import { minifyDate } from '../../lib/date'
import { getCityNameByValue } from '../../lib/ticket'
import useLanguage from '../../stores/useLanguage'
import { HeaderContainer } from '../header/mobile-menu/mobile-menu'

type TicketHeaderProps = {
    cityFrom?: string
    cityTo?: string,
    departureDate?: Date,
    passenger: number,
    child: number,
    onClick?: () => void
}

export default function TicketHeader({ cityFrom, cityTo, departureDate, child, passenger, onClick }: TicketHeaderProps) {
    const { getItem } = useLanguage()
    const cityFromName = getCityNameByValue(cityFrom)
    const cityToName = getCityNameByValue(cityTo)
    const passengerAmount = child + passenger

    const isValidTrip = cityFrom && cityTo

    const content = isValidTrip ? (
        <>
            <h2 className='font-semibold flex items-center justify-center gap-1'>{cityFromName} <ChevronRight /> {cityToName}</h2>
            <span className='text-xs text-[#6B7280]'>{minifyDate(departureDate)}, {passengerAmount} {getItem(passengerAmount > 1 ? "Passengers" : "Passenger")}</span>
        </>
    ) : (
        <h2 className='font-semibold flex items-center justify-center gap-1'>Trip not found</h2>
    )

    const props: any = { className: "md:hidden block" }

    if (isValidTrip) props.onClick = onClick
    else props.url = "/tickets/bus"

    return (
        <HeaderContainer {...props}>
            <div className='flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                {content}
            </div>
        </HeaderContainer>
    )
}
