import React, { useRef } from 'react'
import TicketSelectContent from '../header/ticket-select/content';
import Button from '../fields/button';
import useLanguage from '../../stores/useLanguage';
import { cn } from '../../lib/utils';

type TicketSearchHorizontalType = {
    className?: string
}

export default function TicketSearchHorizontal({ className }: TicketSearchHorizontalType) {
    const { getItem } = useLanguage()

    const ticketSelectContentRef = useRef<{
        search: () => void
    }>();
    return (
        <div className={cn('md:flex hidden flex-col lg:flex-row items-center justify-center bg-white gap-3 rounded-primary p-3', className)}>
            <div className='grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 flex-1'>
                <TicketSelectContent
                    showButton={false}
                    showWarning={false}
                    divideDates={false}
                    minified
                    ref={ticketSelectContentRef}
                />
            </div>
            <Button onClick={() => {
                ticketSelectContentRef?.current?.search()
            }} variant='dark' className='w-full lg:w-[130px]'>{getItem("Search")}</Button>
        </div>
    )
}
