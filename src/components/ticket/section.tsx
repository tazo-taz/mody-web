import { useState } from 'react'
import useSearchTickets from '../../hooks/useSearchTickets'
import { getTicketsFromBusDates } from '../../lib/ticket'
import TicketCard, { ticketChooseType } from './card'
import TicketDatesSlider from './dates-slider'
import useLanguage from '../../stores/useLanguage'

type TicketsSectionType = {
    title: string,
    cityFrom: string,
    cityTo: string,
    dateFrom: Date,
    onChoose: (data: ticketChooseType) => void,
    activeDate: ticketChooseType | null
}

export default function TicketsSection({ title, cityTo, cityFrom, dateFrom, onChoose, activeDate }: TicketsSectionType) {
    const { busDirection, busDates, isLoading } = useSearchTickets(cityFrom, cityTo)
    const { getItem } = useLanguage()

    const [currentDate, setCurrentDate] = useState(dateFrom)
    const currentTickets = getTicketsFromBusDates(busDates, currentDate)

    const tickets = currentTickets.length === 0 && !isLoading ? (
        <div className='flex items-center pt-28 justify-center'>{getItem("Tickets_not_found")}</div>
    ) : (
        <div className='flex flex-col gap-5 mt-7 max-h-[60vh] overflow-y-auto'>
            {currentTickets.map((ticket) => (
                <TicketCard
                    key={ticket.id + ticket.date}
                    cityTo={cityTo}
                    cityFrom={cityFrom}
                    {...ticket}
                    busDirection={busDirection}
                    onChoose={onChoose}
                    active={activeDate}
                />
            ))}
        </div>
    )

    return (
        <>
            <div className='pt-10 mb-5'>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>

            <TicketDatesSlider
                onChange={setCurrentDate}
                active={currentDate}
                dateFrom={dateFrom}
                tickets={busDates}
                height={54.5}
            />

            {tickets}
        </>
    )
}
