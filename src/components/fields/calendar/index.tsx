import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import moment from 'moment';
import React, { useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { LooseValue } from 'react-calendar/dist/cjs/shared/types';
import { useWindowSize } from 'usehooks-ts';
import XCircleIcon from '../../../assets/images/svgs/icons/x-circle';
import useOpen from '../../../hooks/useOpen';
import { cn } from '../../../lib/utils';

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

    const { width } = useWindowSize()

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


    const renderCalendar = () => {
        if (width <= 767) {
            return (<AnimatePresence>
                {isOpen && (
                    <>
                        <div className='fixed inset-0 z-10' onClick={close} />
                        <motion.div
                            initial={{ width: "100vw", left: 0, position: "absolute", bottom: 0 }}
                            animate={{ width: "100vw", left: 0, position: "absolute", bottom: 400 }}
                            exit={{ width: "100vw", left: 0, position: "absolute", bottom: 0 }}
                        >
                            <div className={cn('z-10 transition absolute w-full pb-14 md:pb-4 pt-4 md:pt-4 right-0 md:right-auto left-0 md:left-[104%] shadow-[black_0px_0px_10px_-6px] md:rounded-primary rounded-t-[30px] overflow-hidden md:px-4 flex items-center justify-center bg-white gap-3 flex-col')}>
                                <div className='h-[5px] w-16 bg-gray-200 rounded-md' />
                                <Calendar onChange={ownOnChange} value={value} />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>)
        }

        return isOpen && (
            <>
                <div className='fixed inset-0 z-10' onClick={close} />
                <div className={cn('z-10 transition absolute w-full pb-14 md:pb-4 pt-8 md:pt-4 right-0 md:right-auto left-0 md:left-[104%] shadow-[black_0px_0px_10px_-6px] md:rounded-primary rounded-t-[30px] overflow-hidden md:px-4 flex items-center justify-center bg-white')}>
                    <Calendar onChange={ownOnChange} value={value} />
                </div>
            </>
        )
    }

    return (
        <div className={className}>
            <div className='flex bg-gray-50 md:bg-gray-100 p-[14px] rounded-primary items-center' onClick={open}>
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
