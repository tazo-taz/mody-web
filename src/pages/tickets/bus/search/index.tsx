import { useState } from 'react';
import { ticketChooseType } from '../../../../components/ticket/card';
import TicketsSearchScreen from './search';
import toast from 'react-hot-toast';
import useLanguage from '../../../../stores/useLanguage';
import TicketDetailsScreen from './details';
import useQuery from '../../../../hooks/useQuery';
import { parseTicketQuery } from '../../../../lib/ticket';
import useUser from '../../../../stores/useUser';
import TicketPayScreen from './pay';

export enum screenEnum {
    SEARCH,
    DETAILS,
    PAY
}

export type passengerType = {
    firstName: string,
    lastName: string,
    userId: string,
    save: boolean
}

export default function BusTicketsSearchPage() {
    const [screen, setScreen] = useState<screenEnum>(screenEnum.SEARCH)

    const { getItem } = useLanguage()

    const [activeOutbound, setActiveOutbound] = useState<ticketChooseType | null>(null)
    const [activeReturn, setActiveReturn] = useState<ticketChooseType | null>(null)
    const [adultPassengers, setAdultPassengers] = useState<passengerType[]>([])
    const [childPassengers, setChildPassengers] = useState<passengerType[]>([])
    const query = useQuery()
    const user = useUser()

    const searchToDetailsScreen = () => {
        if (activeOutbound)
            if ((parseTicketQuery(query).returnDate && activeReturn) || !parseTicketQuery(query).returnDate) {
                const { child, passenger } = parseTicketQuery(query)
                const adultPassengers = [...new Array(passenger)].map(() => ({
                    firstName: "",
                    lastName: "",
                    userId: "",
                    save: true
                }))

                if (user.user) adultPassengers[0] = structuredClone({ ...user.user, save: true })

                setAdultPassengers(adultPassengers)
                setChildPassengers([...new Array(child)].map(() => ({
                    firstName: "",
                    lastName: "",
                    userId: "",
                    save: true
                })))
                return setScreen(screenEnum.DETAILS)
            }

        toast.error(getItem("Choose_tickets"))
    }

    const detailsToReviewScreen = () => {
        const mainPassenger = adultPassengers[0]
        if (mainPassenger.firstName && mainPassenger.lastName && mainPassenger.userId) {
            setScreen(screenEnum.PAY)
            return true
        }
        toast.error(getItem("Fill_main_passenger_information"))
        return false
    }

    const handlePay = () => {

    }


    if (screen === screenEnum.SEARCH) {
        return (
            <TicketsSearchScreen
                activeOutbound={activeOutbound}
                activeReturn={activeReturn}
                setActiveOutbound={setActiveOutbound}
                setActiveReturn={setActiveReturn}
                onContinue={searchToDetailsScreen}
            />
        )
    } else if (screen === screenEnum.DETAILS) {
        return (
            <TicketDetailsScreen
                setScreen={setScreen}
                outboundTicket={activeOutbound}
                returnTicket={activeReturn}
                detailsToReviewScreen={detailsToReviewScreen}
                adultPassengers={adultPassengers}
                childPassengers={childPassengers}
                setAdultPassengers={setAdultPassengers}
                setChildPassengers={setChildPassengers}
            />
        )
    }

    return (
        <TicketPayScreen
            setScreen={setScreen}
            handlePay={handlePay}
            outboundTicket={activeOutbound}
            returnTicket={activeReturn}
            adultPassengers={adultPassengers}
            childPassengers={childPassengers}
        />
    )
}
