import { useState } from 'react'
import CalendarIcon from '../../../assets/images/svgs/icons/calendar'
import CircleIcon from '../../../assets/images/svgs/icons/cirlce-icon'
import LocationIcon from '../../../assets/images/svgs/icons/location'
import UserIcon from '../../../assets/images/svgs/icons/user'
import WarningIcon from '../../../assets/images/svgs/icons/warning'
import { getCityRoutes } from '../../../lib/bus-api'
import useLanguage from '../../../stores/useLanguage'
import Warning from '../../Warning'
import Button from '../../fields/button'
import CalendarInput from '../../fields/calendar'
import CounterField from '../../fields/counter-field'
import Select from '../../fields/select'

export default function TicketSelectContent() {
    const [cityFrom, setCityFrom] = useState<string>()
    const [cityTo, setCityTo] = useState<string>()

    const [passenger, setPassenger] = useState(0)
    const [child, setChild] = useState(0)

    const [departureDate, setDepartureDate] = useState<Date | undefined>()
    const [returnDate, setReturnDate] = useState<Date | undefined>()
    const { getItem } = useLanguage()

    // const { language } = useLanguage()

    console.log("rerender");

    return (
        <>
            <Select
                placeholder={getItem("From")}
                icon={<CircleIcon />}
                items={getCityRoutes(cityFrom, cityTo)}
                value={cityFrom}
                onChange={setCityFrom}
            />
            <Select
                placeholder={getItem("To")}
                icon={<LocationIcon />}
                items={getCityRoutes(cityTo, cityFrom)}
                value={cityTo}
                onChange={setCityTo}
                sort={2}
            />
            <div className='flex gap-4'>
                <CalendarInput
                    placeholder={getItem("Departure")}
                    icon={<CalendarIcon />}
                    value={departureDate}
                    onChange={setDepartureDate}
                    sort={3}
                    className="flex-1"
                />
                <CalendarInput
                    placeholder={getItem("Return")}
                    icon={<CalendarIcon />}
                    value={returnDate}
                    onChange={setReturnDate}
                    sort={3}
                    className="flex-1"
                />
            </div>
            <CounterField
                placeholder={getItem("Passenger")}
                secondaryPlaceholder={getItem("ten_years_above")}
                icon={<UserIcon />}
                value={passenger}
                onChange={setPassenger}
                sort={4}
            />
            <CounterField
                placeholder={getItem("Child")}
                secondaryPlaceholder={getItem("five_to_ten_years")}
                icon={<UserIcon />}
                value={child}
                onChange={setChild}
                sort={5}
            />
            <Warning icon={<WarningIcon />} text={getItem("Child_passenger_information")} />
            <Button className='mt-auto md:mt-[14px]'>{getItem("Search")}</Button>
        </>
    )
}
