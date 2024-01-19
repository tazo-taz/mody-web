import { useAnimate } from 'framer-motion';
import React, { useEffect } from 'react';
import XCircleIcon from '../../../assets/images/svgs/icons/x-circle';
import useOpen from '../../../hooks/useOpen';
import { cn } from '../../../lib/utils';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { LooseValue } from 'react-calendar/dist/cjs/shared/types';
import moment from 'moment';

type CalendarInputProps = {
    placeholder: string,
    icon?: React.ReactNode,
    onChange: (item?: Date) => void,
    value?: Date,
    sort?: number,
    className?: string
}

export default function CalendarInput({ placeholder, icon, onChange, value, sort = 1, className }: CalendarInputProps) {
    const { isOpen, open, close } = useOpen(false)
    const [scope, animate] = useAnimate()

    const ownIcon = (
        <div className='w-[30px]'>
            {icon}
        </div>
    )

    const ownOnChange = (date: LooseValue) => {
        if (date instanceof Date && !isNaN(date.valueOf())) {
            onChange(date)
            animate("h2", { y: -10, x: -3.5, scale: 0.8 })
            close()
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

    return (
        <div className={className}>
            <div className='flex bg-gray-100 p-[14px] rounded-primary items-center' onClick={open}>
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

            {isOpen && (
                <>
                    <div className='fixed inset-0 z-10' onClick={close} />

                    <div className='z-10 absolute left-[104%] bottom-0 rounded-primary overflow-hidden p-4 bg-white'>
                        <Calendar onChange={ownOnChange} value={value} />
                    </div>
                </>
            )}
        </div>
    )
}
