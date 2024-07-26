import { useState } from 'react'
import { IoReload } from 'react-icons/io5'
import { useElementSize } from 'usehooks-ts'
import useSearchTickets from '../../hooks/firebase/useSearchTickets'
import { busSystemDatesType } from '../../hooks/firebase/useSearchTickets/types'
import { getTicketsFromBusDates } from '../../lib/ticket'
import useLanguage from '../../stores/useLanguage'
import Title from '../title'
import TicketCard from './card/simple'
import BusSystemTicketCard from './card/simple/bus-system'
import TicketDatesSlider from './dates-slider'
import { ticketChooseType } from './card/simple/type'

type TicketsSectionType = {
    title: string,
    cityFrom: string,
    cityTo: string,
    dateFrom: Date,
    onChoose: (data: ticketChooseType) => void,
    activeDate: ticketChooseType | null
}

export default function TicketsSection({ title, cityTo, cityFrom, dateFrom, onChoose, activeDate }: TicketsSectionType) {
    const [currentDate, setCurrentDate] = useState(activeDate?.date ? new Date(activeDate?.date) : dateFrom)
    const { busDirection, busDates, isLoading, busSystemDates } = useSearchTickets(cityFrom, cityTo, currentDate)
    const { getItem } = useLanguage()
    const [squareRef, { width }] = useElementSize()

    const currentTickets = getTicketsFromBusDates(busDates, currentDate)

    const geoBusTickets = currentTickets.map((ticket) => ({
        element: (
            <TicketCard
                key={ticket.id + ticket.date}
                cityTo={cityTo}
                cityFrom={cityFrom}
                {...ticket}
                busDirection={busDirection}
                onChoose={onChoose}
                active={activeDate}
            />
        ),
        date: ticket.date
    }))

    const busSystemTickets = busSystemDates.map((ticket: busSystemDatesType) => ({
        element: (
            <BusSystemTicketCard
                key={ticket.interval_id + ticket.date_from + ticket.time_from}
                {...ticket}
                onChoose={onChoose}
                active={activeDate}
            />
        ),
        date: new Date(ticket.date_from + 'T' + ticket.time_from)
    }))

    const ticketsHTML = [...geoBusTickets, ...busSystemTickets].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).filter((item) => {
        const date = new Date(item.date)
        return date >= new Date()
    }).map((item) => item.element)


    const tickets = ticketsHTML.length === 0 && !isLoading ? (
        <div className='flex items-center pt-28 justify-center'>{getItem("Tickets_not_found")}</div>
    ) : (
        <div className='flex flex-col gap-5 mt-7 max-h-[60vh] overflow-y-auto'>
            {ticketsHTML}
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
                busSystemDates={busSystemDates}
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
