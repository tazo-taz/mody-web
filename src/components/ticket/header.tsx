import { HeaderContainer } from '../header/mobile-menu/mobile-menu'
import TicketHeaderTitle from './ticket-header-title'

type TicketHeaderProps = {
    cityFrom?: string
    cityTo?: string,
    departureDate?: Date,
    onClick?: () => void
}

export default function TicketHeader({ cityFrom, cityTo, onClick, departureDate }: TicketHeaderProps) {
    const isValidTrip = cityFrom && cityTo

    const content = isValidTrip ? (
        <TicketHeaderTitle departureDate={departureDate} />
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
