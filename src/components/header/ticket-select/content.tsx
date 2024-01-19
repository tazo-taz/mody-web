import React, { useState } from 'react'
import { getLanguageItem } from '../../../assets/language'
import Select from '../../fields/select'
import CircleIcon from '../../../assets/images/svgs/icons/cirlce-icon'
import { getCityRoutes } from '../../../lib/bus-api'
import LocationIcon from '../../../assets/images/svgs/icons/location'
import CalendarInput from '../../fields/calendar'
import CalendarIcon from '../../../assets/images/svgs/icons/calendar'
import CounterField from '../../fields/counter-field'
import UserIcon from '../../../assets/images/svgs/icons/user'
import WarningIcon from '../../../assets/images/svgs/icons/warning'
import Warning from '../../Warning'
import Button from '../../fields/button'

export default function TicketSelectContent() {
    const [cityFrom, setCityFrom] = useState<string>()
    const [cityTo, setCityTo] = useState<string>()

    const [passenger, setPassenger] = useState(0)
    const [child, setChild] = useState(0)

    const [departureDate, setDepartureDate] = useState<Date | undefined>()
    const [returnDate, setReturnDate] = useState<Date | undefined>()

    return (
        <>
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
            <Button className='mt-auto md:mt-[14px]'>{getLanguageItem("Search")}</Button>
        </>
    )
}
