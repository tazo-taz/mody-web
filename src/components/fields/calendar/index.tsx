import { useAnimate } from 'framer-motion';
import moment from 'moment';
import React, { useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { LooseValue } from 'react-calendar/dist/cjs/shared/types';
import { useWindowSize } from 'usehooks-ts';
import XCircleIcon from '../../../assets/images/svgs/icons/x-circle';
import useOpen from '../../../hooks/useOpen';
import { cn } from '../../../lib/utils';
import useModal from '../../../stores/useModal';

type CalendarInputProps = {
    placeholder: string,
    icon?: React.ReactNode,
    onChange: (item?: Date) => void,
    value?: Date,
    sort?: number,
    className?: string,
    calendarBottom?: boolean
}

export default function CalendarInput({ placeholder, icon, onChange, value, sort = 1, className, calendarBottom = false }: CalendarInputProps) {
    const { isOpen, open, close } = useOpen(false)
    const [scope, animate] = useAnimate()
    const { onOpen, onClose } = useModal()
    const { width } = useWindowSize()

    const handleOpen = () => {
        if (width <= 767)
            onOpen("calendar", { calendar: { ownOnChange, value } })
        else
            open()
    }

    const ownIcon = (
        <div className='w-[30px]'>
            {icon}
        </div>
    )

    const ownOnChange = (date: LooseValue) => {
        if (date instanceof Date && !isNaN(date.valueOf())) {
            onChange(date)
            animate("h2", { y: -10, x: -3.5, scale: 0.8 })
            if (width <= 767) onClose()
            else close()
        }
    }

    const cancel = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        onChange()
        animate("h2", { y: 0, x: 0, scale: 1 })
    }

    useEffect(() => {
        animate("h2", { opacity: [0, 1] }, { duration: 0.5, delay: sort * 0.1 })
        if (value) {
            animate("h2", { y: -10, x: -5, scale: 0.8 })
            animate("h1", { opacity: [0, 1] }, { duration: 0.5, delay: sort * 0.1 })
        }

    }, [animate, scope, sort, value])


    const renderCalendar = () => {
        if (width <= 767) {
            return null;
        }

        return isOpen && (
            <>
                <div className='fixed inset-0 z-10' onClick={close} />
                <div className={cn('z-10 transition absolute w-full pb-14 md:pb-4 pt-8 md:pt-4 right-0 md:right-auto left-0 md:left-[104%] shadow-[black_0px_0px_10px_-6px] md:rounded-primary rounded-t-[30px] overflow-hidden md:px-4 flex items-center justify-center bg-white', calendarBottom && "top-[120%] md:right-0 right-0 md:left-auto left-auto w-[340px]")}>
                    <Calendar onChange={ownOnChange} value={value} />
                </div>
            </>
        )
    }

    return (
        <div className={className}>
            <div className='flex border-1 bg-gray-50 md:bg-gray-100 p-[14px] rounded-primary items-center' onClick={handleOpen}>
                {ownIcon}

                <div ref={scope} className='flex flex-col relative'>
                    <h2 className='text-gray-500'>{placeholder}</h2>
                    <h1 className='absolute top-2 left-0 whitespace-nowrap'>{value && moment(value).format('ddd, MMM D')}</h1>
                </div>

                {value && (
                    <div className='ml-auto cursor-pointer' onClick={cancel}>
                        <XCircleIcon />
                    </div>
                )}
            </div>

            {renderCalendar()}

        </div>
    )
}
