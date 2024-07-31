import { filterUnfilledPassengers } from '../../lib/ticket'
import { passengerType } from '../../pages/tickets/bus/search'
import useLanguage from '../../stores/useLanguage'
import Card from '../card'
import Passenger from './passenger'

type PassengerDetailsType = {
    passengers: passengerType[]
}

export default function PassengerDetails({
    passengers,
}: PassengerDetailsType) {
    const { getItem } = useLanguage()

    // const filteredPassangers = filterUnfilledPassengers(passengers)

    return (
        <Card title={getItem("Passenger_details")}>
            <div className='flex flex-col gap-6'>
                {passengers.map((passenger, inx) => (
                    <Passenger
                        {...passenger}
                        bottomBorder={passengers.length - 1 !== inx}
                        key={inx}
                    />
                ))}
            </div>
        </Card>
    )
}
