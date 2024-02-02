import { filterPassengers } from '../../lib/ticket'
import { passengerType } from '../../pages/tickets/bus/search'
import useLanguage from '../../stores/useLanguage'
import Card from '../card'
import Passenger from './passenger'

type PassengerDetailsType = {
    adultPassengers: passengerType[]
    childPassengers: passengerType[]
}

export default function PassengerDetails({
    adultPassengers,
    childPassengers,
}: PassengerDetailsType) {
    const { getItem } = useLanguage()

    const filteredAdultPassengers = filterPassengers(adultPassengers)
    const filteredChildPassengers = filterPassengers(childPassengers)

    return (
        <Card title={getItem("Passenger_details")}>
            <div className='flex flex-col gap-6'>
                {filteredAdultPassengers.map((passenger, inx) => (
                    <Passenger
                        {...passenger}
                        isAdult
                        bottomBorder={filteredAdultPassengers.length + filteredChildPassengers.length - 1 !== inx}
                        key={inx}
                    />
                ))}
                {filteredChildPassengers.map((passenger, inx) => (
                    <Passenger
                        {...passenger}
                        bottomBorder={filteredChildPassengers.length - 1 !== inx}
                        key={inx}
                    />
                ))}
            </div>
        </Card>
    )
}
