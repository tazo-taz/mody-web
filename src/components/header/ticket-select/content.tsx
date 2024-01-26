import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import CalendarIcon from '../../../assets/images/svgs/icons/calendar'
import CircleIcon from '../../../assets/images/svgs/icons/cirlce-icon'
import LocationIcon from '../../../assets/images/svgs/icons/location'
import UserIcon from '../../../assets/images/svgs/icons/user'
import WarningIcon from '../../../assets/images/svgs/icons/warning'
import useQuery from '../../../hooks/useQuery'
import { getCityRoutes, getTicketQuery, transformTicketFormToQuery } from '../../../lib/ticket'
import useLanguage from '../../../stores/useLanguage'
import Warning from '../../Warning'
import Button from '../../fields/button'
import CalendarInput from '../../fields/calendar'
import CounterField from '../../fields/counter-field'
import EmptyFieldDropdown from '../../fields/empty-field-dropdown'
import Select from '../../fields/select'

type TicketSelectContentType = {
    showWarning?: boolean,
    showButton?: boolean,
    divideDates?: boolean,
    minified?: boolean,
    modalBottom?: number,
    handleSearch?: (url: string | null) => void,
    reff?: React.MutableRefObject<any>
}

const TicketSelectContent = forwardRef(({ showButton = true, showWarning = true, divideDates = true, modalBottom, minified, handleSearch }: TicketSelectContentType, ref) => {
    const query = useQuery()
    const {
        cityFrom: cityFromQuery,
        cityTo: cityToQuery,
        passenger: passengerQuery,
        child: childQuery,
        departureDate: departureDateQuery,
        returnDate: returnDateQuery,
    } = getTicketQuery(query)

    const [cityFrom, setCityFrom] = useState(cityFromQuery)
    const [cityTo, setCityTo] = useState(cityToQuery)

    const [passenger, setPassenger] = useState(passengerQuery)
    const [child, setChild] = useState(childQuery)

    const [departureDate, setDepartureDate] = useState<Date | undefined>(departureDateQuery)
    const [returnDate, setReturnDate] = useState<Date | undefined>(returnDateQuery)
    const { getItem } = useLanguage()

    const navigate = useNavigate()

    const search = useCallback(() => {
        const url = transformTicketFormToQuery({ cityFrom, cityTo, passenger, child, departureDate, returnDate })

        if (url) {
            navigate(url)
        } else toast.error(getItem("Fill_in_the_fields"))
    }, [cityFrom, cityTo, passenger, child, departureDate, returnDate, getItem, navigate])

    useImperativeHandle(ref, () => ({
        search,
    }), [search]);

    const departureDateElement = (
        <CalendarInput
            modalBottom={modalBottom}
            placeholder={getItem("Departure")}
            icon={<CalendarIcon />}
            value={departureDate}
            onChange={setDepartureDate}
            sort={3}
            className="flex-1"
            calendarBottom={!divideDates}
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
            calendarBottom={!divideDates}
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
                <div className='relative'>
                    {departureDateElement}
                </div>
                <div className='relative'>
                    {returnDateElement}
                </div>
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
})

export default TicketSelectContent