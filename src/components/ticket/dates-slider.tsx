

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

// import required modules

type TicketDatesSliderProps = {
    dateFrom: Date,
    active: Date,
    onChange: (newDate: Date) => void,
    tickets: busDatesType,
    height: number
}
export default function TicketDatesSlider({ dateFrom, active, onChange, tickets, height }: TicketDatesSliderProps) {
    return (
        <Swiper
            direction={'horizontal'}
            slidesPerView={'auto'}
            freeMode={true}
            mousewheel={true}
            modules={[FreeMode, Mousewheel]}
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
    )
}
