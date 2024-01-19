import { useState } from 'react'
import ChevronDown from '../../assets/images/svgs/icons/chevron-down'
import CircleIcon from '../../assets/images/svgs/icons/cirlce-icon'
import TicketIcon from '../../assets/images/svgs/icons/ticket-icon'
import { getLanguageItem } from '../../assets/language'
import useOpen from '../../hooks/useOpen'
import Select from '../fields/select'
import { getCityRoutes } from '../../lib/bus-api'
import LocationIcon from '../../assets/images/svgs/icons/location'
import CounterField from '../fields/counter-field'
import UserIcon from '../../assets/images/svgs/icons/user'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../fields/button'
import Warning from '../Warning'
import WarningIcon from '../../assets/images/svgs/icons/warning'
import CalendarInput from '../fields/calendar'
import CalendarIcon from '../../assets/images/svgs/icons/calendar'

export default function TicketSelect() {
    const { isOpen, open, close } = useOpen(false)

    const [cityFrom, setCityFrom] = useState<string>()
    const [cityTo, setCityTo] = useState<string>()

    const [passenger, setPassenger] = useState(0)
    const [child, setChild] = useState(0)

    const [departureDate, setDepartureDate] = useState<Date | undefined>()
    const [returnDate, setReturnDate] = useState<Date | undefined>()

    return (
        <>
            <div className='relative'>
                {isOpen && (
                    <>
                        <div onClick={close} className='inset-0 fixed z-10' />
                        <div className='inset-0 top-[95px] fixed bg-black opacity-50' />
                    </>
                )}
                <div onClick={open} className='px-[15px] py-[14px] rounded-primary flex items-center gap-[10px] border-secondary border-1 bg-[#1119280D]'>
                    <TicketIcon />
                    <h5 className='font-[500]'>{getLanguageItem("Search_your_ticket")}</h5>

                    <ChevronDown className="ml-[36px]" />
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            className='flex flex-col gap-4 absolute top-[130%] z-10 right-[-40px] shadow-[black_0px_0px_10px_-6px] w-[395px] p-5 bg-white rounded-primary'>
                            <Select
                                placeholder={getLanguageItem("From")}
                                icon={<CircleIcon />}
                                items={getCityRoutes(cityFrom, cityTo)}
                                value={cityFrom}
                                onChange={setCityFrom}
                            />
                            <Select
                                placeholder={getLanguageItem("To")}
                                icon={<LocationIcon />}
                                items={getCityRoutes(cityTo, cityFrom)}
                                value={cityTo}
                                onChange={setCityTo}
                                sort={2}
                            />
                            <div className='flex gap-4'>
                                <CalendarInput
                                    placeholder={getLanguageItem("Departure")}
                                    icon={<CalendarIcon />}
                                    value={departureDate}
                                    onChange={setDepartureDate}
                                    sort={3}
                                    className="flex-1"
                                />
                                <CalendarInput
                                    placeholder={getLanguageItem("Return")}
                                    icon={<CalendarIcon />}
                                    value={returnDate}
                                    onChange={setReturnDate}
                                    sort={3}
                                    className="flex-1"
                                />
                            </div>
                            <CounterField
                                placeholder={getLanguageItem("Passenger")}
                                secondaryPlaceholder={getLanguageItem("ten_years_above")}
                                icon={<UserIcon />}
                                value={passenger}
                                onChange={setPassenger}
                                sort={4}
                            />
                            <CounterField
                                placeholder={getLanguageItem("Child")}
                                secondaryPlaceholder={getLanguageItem("five_to_ten_years")}
                                icon={<UserIcon />}
                                value={child}
                                onChange={setChild}
                                sort={5}
                            />
                            <Warning icon={<WarningIcon />} text={getLanguageItem("Child_passenger_information")} />
                            <Button className='mt-[14px]'>{getLanguageItem("Search")}</Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}
