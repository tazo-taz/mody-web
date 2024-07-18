

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules

import { addDays, dayDiff } from '../../lib/date';
import { getTicketsCount } from '../../lib/ticket';
import TicketDate from './ticket-date';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { IoReload } from "react-icons/io5";
import { FreeMode, Mousewheel } from 'swiper';
import { useWindowSize } from 'usehooks-ts';
import { busDatesType, busSystemDatesType } from '../../hooks/firebase/useSearchTickets/types';

type TicketDatesSliderProps = {
    dateFrom: Date,
    active: Date,
    onChange: (newDate: Date) => void,
    tickets: busDatesType,
    width: number
    height: number,
    busSystemDates: busSystemDatesType[]
}
export default function TicketDatesSlider({ dateFrom, active, onChange, tickets, width, height, busSystemDates }: TicketDatesSliderProps) {
    const [isLoading, setIsLoading] = useState(false)
    const { width: windowWidth } = useWindowSize()
    const swiperRef = useRef<any>(null)
    const prevDays = useMemo(() => dayDiff(dateFrom, new Date()), [dateFrom])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const daysFromActive = useMemo(() => dayDiff(active, new Date()), [])

    useEffect(() => {
        let timeout: any;
        setIsLoading(true)
        timeout = setTimeout(() => setIsLoading(false), 250)
        return () => clearTimeout(timeout);
    }, [windowWidth])

    useLayoutEffect(() => {
        !isLoading && daysFromActive && setTimeout(() => {
            swiperRef.current?.slideTo?.(daysFromActive)
        }, 500)
    }, [daysFromActive, isLoading])


    if (!width || isLoading) return (
        <div style={{ height }} className='border-1 rounded-primary mr-[4px] flex items-center justify-center'>
            <IoReload className='animate-spin' size={20} />
        </div>
    )

    return (
        <div style={{ width }}>
            <Swiper
                ref={swiperRef}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper
                }}
                direction={'horizontal'}
                freeMode={true}
                mousewheel={true}
                modules={[FreeMode, Mousewheel]}
                slidesPerView={'auto'}
            >
                {[...new Array(prevDays)].map((item, inx) => {
                    const date = addDays(dateFrom, -prevDays + (inx))
                    return (
                        <SwiperSlide
                            key={inx}
                            style={{ marginLeft: 10, flexShrink: "unset" }}
                        >
                            <TicketDate active={active}
                                date={date}
                                count={getTicketsCount(tickets, busSystemDates, date)}
                                onChange={onChange}
                            />
                        </SwiperSlide>
                    )
                })}
                {[...new Array(14)].map((item, inx) => {
                    const date = addDays(dateFrom, inx)
                    return (
                        <SwiperSlide
                            key={inx}
                            style={{ marginLeft: 10, flexShrink: "unset" }}
                        >
                            <TicketDate active={active}
                                date={date}
                                count={getTicketsCount(tickets, busSystemDates, date)}
                                onChange={onChange}
                            />
                        </SwiperSlide>
                    )
                })}
            </Swiper >
        </div>
    )
}
