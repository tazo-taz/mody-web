

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules

import { busDatesType } from '../../hooks/firebase/useSearchTickets';
import { addDays } from '../../lib/date';
import { getTicketsFromBusDates } from '../../lib/ticket';
import TicketDate from './ticket-date';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

import { FreeMode, Mousewheel } from 'swiper';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import { IoReload } from "react-icons/io5";

// import required modules

type TicketDatesSliderProps = {
    dateFrom: Date,
    active: Date,
    onChange: (newDate: Date) => void,
    tickets: busDatesType,
    width: number
    height: number
}
export default function TicketDatesSlider({ dateFrom, active, onChange, tickets, width, height }: TicketDatesSliderProps) {
    const [isLoading, setIsLoading] = useState(false)
    const { width: windowWidth } = useWindowSize()

    useEffect(() => {
        let timeout: any;
        setIsLoading(true)
        timeout = setTimeout(() => setIsLoading(false), 250)
        return () => clearTimeout(timeout);
    }, [windowWidth])

    if (!width || isLoading) return (
        <div style={{ height }} className='border-1 rounded-primary mr-[4px] flex items-center justify-center'>
            <IoReload className='animate-spin' size={20} />
        </div>
    )

    return (
        <div style={{ width }}>
            <Swiper
                direction={'horizontal'}
                freeMode={true}
                mousewheel={true}
                modules={[FreeMode, Mousewheel]}

                slidesPerView={'auto'}
            >
                {[...new Array(11)].map((item, inx) => {
                    const date = addDays(dateFrom, inx)
                    return (
                        <SwiperSlide
                            key={inx}
                            style={{ marginLeft: 10, flexShrink: "unset" }}
                        >
                            <TicketDate active={active}
                                date={date}
                                count={getTicketsFromBusDates(tickets, date).length}
                                onChange={onChange}
                            />
                        </SwiperSlide>
                    )
                })}
            </Swiper >
        </div>
    )
}
