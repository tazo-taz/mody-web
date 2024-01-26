import { useState } from 'react'
import CalendarIcon from '../../../assets/images/svgs/icons/calendar'
import CircleIcon from '../../../assets/images/svgs/icons/cirlce-icon'
import LocationIcon from '../../../assets/images/svgs/icons/location'
import UserIcon from '../../../assets/images/svgs/icons/user'
import WarningIcon from '../../../assets/images/svgs/icons/warning'
import { getCityRoutes, transformTicketFormToQuery } from '../../../lib/ticket'
import useLanguage from '../../../stores/useLanguage'
import Warning from '../../Warning'
import Button from '../../fields/button'
import CalendarInput from '../../fields/calendar'
import CounterField from '../../fields/counter-field'
import EmptyFieldDropdown from '../../fields/empty-field-dropdown'
import Select from '../../fields/select'
import { useNavigate } from 'react-router-dom'

type TicketSelectContentType = {
    showWarning?: boolean,
    showButton?: boolean,
    divideDates?: boolean,
    minified?: boolean,
    modalBottom?: number
}

export default function TicketSelectContent({ showButton = true, showWarning = true, divideDates = true, modalBottom, minified }: TicketSelectContentType) {
    const [cityFrom, setCityFrom] = useState<string>()
    const [cityTo, setCityTo] = useState<string>()

    const [passenger, setPassenger] = useState(1)
    const [child, setChild] = useState(0)

    const [departureDate, setDepartureDate] = useState<Date | undefined>(new Date())
    const [returnDate, setReturnDate] = useState<Date | undefined>()
    const { getItem } = useLanguage()

    const navigate = useNavigate()

    const search = () => {
        console.log(transformTicketFormToQuery({ cityFrom, cityTo, passenger, child, departureDate, returnDate }))

    }

    const departureDateElement = (
        <CalendarInput
            modalBottom={modalBottom}
            placeholder={getItem("Departure")}
            icon={<CalendarIcon />}
            value={departureDate}
            onChange={setDepartureDate}
            sort={3}
            className="flex-1"
        />
    )

    const returnDateElement = (
        <CalendarInput
            modalBottom={modalBottom}
            placeholder={getItem("Return")}
            icon={<CalendarIcon />}
            value={returnDate}
            onChange={setReturnDate}
            sort={3}
            className="flex-1"
        />
    )

    let datesElement = (
        <div className='flex gap-4'>
            {departureDateElement}
            {returnDateElement}
        </div>
    )

    if (!divideDates) {
        datesElement = (
            <>
                {departureDateElement}
                {returnDateElement}
            </>
        )
    }

    let counterFields = (
        <>
            <CounterField
                placeholder={getItem("Passenger")}
                secondaryPlaceholder={getItem("ten_years_above")}
                icon={<UserIcon />}
                value={passenger}
                onChange={setPassenger}
                sort={4}
                min={1}
            />
            <CounterField
                placeholder={getItem("Child")}
                secondaryPlaceholder={getItem("five_to_ten_years")}
                icon={<UserIcon />}
                value={child}
                onChange={setChild}
                sort={5}
            />
        </>
    )

    if (minified) counterFields = (
        <EmptyFieldDropdown
            width={300}
            icon={<UserIcon />}
            value={getItem("Adult")}
            placeholder={getItem("Passenger")}
            className="md:bg-gray-100 bg-gray-50"
            items={[
                {
                    custom: true,
                    element: (
                        <CounterField
                            placeholder={getItem("Passenger")}
                            secondaryPlaceholder={getItem("ten_years_above")}
                            icon={<UserIcon />}
                            value={passenger}
                            onChange={setPassenger}
                            sort={0}
                            className="md:bg-white bg-white border-0"
                            min={1}
                        />
                    )
                },
                { isSeparator: true },
                {
                    custom: true,
                    element: (
                        <CounterField
                            placeholder={getItem("Child")}
                            secondaryPlaceholder={getItem("five_to_ten_years")}
                            icon={<UserIcon />}
                            value={child}
                            onChange={setChild}
                            sort={1}
                            className="md:bg-white bg-white border-0"
                        />
                    )
                },
            ]}
        />
    )

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
            {datesElement}
            {counterFields}
            {showWarning && (
                <Warning icon={<WarningIcon />} text={getItem("Child_passenger_information")} />
            )}
            {showButton && (
                <Button onClick={search} className='mt-auto md:mt-[14px]'>{getItem("Search")}</Button>
            )}
        </>
    )
}
