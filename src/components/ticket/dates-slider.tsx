

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules

import { addDays } from '../../lib/date';
import Scrollable from '../scrollable';
import TicketDate from './ticket-date';
import { busDatesType } from '../../hooks/firebase/useSearchTickets';
import { getTicketsFromBusDates } from '../../lib/ticket';
import { useWindowSize } from 'usehooks-ts';
import { useEffect, useState } from 'react';

type TicketDatesSliderProps = {
    dateFrom: Date,
    active: Date,
    onChange: (newDate: Date) => void,
    tickets: busDatesType,
    height: number
}
export default function TicketDatesSlider({ dateFrom, active, onChange, tickets, height }: TicketDatesSliderProps) {
    const { width } = useWindowSize()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(false)
        const timeout = setTimeout(() => setIsLoaded(true), 500)
        return () => clearTimeout(timeout)
    }, [width])

    if (!isLoaded) {
        return (
            <div className='text-gray-400 bg-[#F3F4F6] border-1 border-[#E5E7EB] flex items-center justify-center rounded-md text-center' style={{
                height
            }}>Loading</div>
        )
    }

    return (
        <Scrollable height={height}>
            {[...new Array(11)].map((item, inx) => {
                const date = addDays(dateFrom, inx)
                return (
                    <TicketDate
                        key={inx}
                        active={active}
                        date={date}
                        count={getTicketsFromBusDates(tickets, date).length}
                        onChange={onChange}
                    />
                )
            })}
        </Scrollable>
    )
}
