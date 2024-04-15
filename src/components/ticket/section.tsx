import { useState } from 'react'
import { IoReload } from 'react-icons/io5'
import { useElementSize } from 'usehooks-ts'
import useSearchTickets from '../../hooks/firebase/useSearchTickets'
import { getTicketsFromBusDates } from '../../lib/ticket'
import useLanguage from '../../stores/useLanguage'
import Title from '../title'
import TicketCard, { ticketChooseType } from './card/simple'
import TicketDatesSlider from './dates-slider'

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
    const [squareRef, { width }] = useElementSize()

    const [currentDate, setCurrentDate] = useState(activeDate?.date ? new Date(activeDate?.date) : dateFrom)
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
            <Title>{title}</Title>

            <TicketDatesSlider
                onChange={setCurrentDate}
                active={currentDate}
                dateFrom={dateFrom}
                tickets={busDates}
                height={54.5}
                width={width}
            />

            <div ref={squareRef}>
                {isLoading ? <div className='mt-[200px] rounded-primary mr-[4px] flex items-center justify-center'>
                    <IoReload className='animate-spin' size={30} />
                </div> :
                    tickets
                }
            </div>

        </>
    )
}
