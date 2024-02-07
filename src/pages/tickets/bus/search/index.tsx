import { useEffect, useState } from 'react';
import { ticketChooseType } from '../../../../components/ticket/card';
import TicketsSearchScreen from './screens/search';
import toast from 'react-hot-toast';
import useLanguage from '../../../../stores/useLanguage';
import TicketDetailsScreen from './screens/details';
import useQuery from '../../../../hooks/useQuery';
import { parseTicketQuery } from '../../../../lib/ticket';
import useAuth from '../../../../stores/useAuth';
import TicketPayScreen from './screens/pay';
import { userSchemaType } from '../../../../schemas/user';
import { functions } from '../../../../firebase';
import { startLoading, stopLoading } from '../../../../references/loading';

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

export type contactInfoType = Pick<userSchemaType, "email" | "firstName" | "phoneNumber"> & { email: string }

export default function BusTicketsSearchPage() {
    const [screen, setScreen] = useState<screenEnum>(screenEnum.SEARCH)

    const { getItem } = useLanguage()
    const auth = useAuth()

    const [activeOutbound, setActiveOutbound] = useState<ticketChooseType | null>(null)
    const [activeReturn, setActiveReturn] = useState<ticketChooseType | null>(null)
    const [adultPassengers, setAdultPassengers] = useState<passengerType[]>([])
    const [childPassengers, setChildPassengers] = useState<passengerType[]>([])
    const [paymentType, setPaymentType] = useState<string | number | null>(null)
    const [contactInfo, setContactInfo] = useState<contactInfoType>({
        email: "",
        firstName: "",
        phoneNumber: ""
    })

    useEffect(() => {
        if (auth.user) {
            const { firstName, phoneNumber, email } = auth.user
            setContactInfo({ firstName, phoneNumber: phoneNumber.slice(3), email: email || "" })
        }
    }, [auth.user])

    const query = useQuery()

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

                if (auth.user) adultPassengers[0] = structuredClone({ ...auth.user, save: true })

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

    const handlePay = async () => {
        try {
            startLoading()

            if (paymentType === null) {
                return toast.error(getItem("Choose_payment_method"))
            }

            const payBusPriceData: any = {
                item: {
                    busDirectionId: activeOutbound!.busDirection!.id,
                    date: activeOutbound!.date,
                    flightId: activeOutbound!.id
                },
                paymentType,
                adult: `${adultPassengers.length}`,
                child: `${childPassengers.length}`,
                requestId: `xxx${Math.random()}`
            }

            if (adultPassengers[0].save) {
                payBusPriceData.info = {
                    firstNameValue: auth.user!.firstName,
                    lastNameValue: auth.user!.lastName,
                    userIdValue: auth.user!.userId,
                }
            }

            if (activeReturn) {
                payBusPriceData.returnItem = {
                    busDirectionId: activeReturn!.busDirection!.id,
                    date: activeReturn!.date,
                    flightId: activeReturn!.id
                }
            }

            // return
            const data = await functions('payBusPrice', payBusPriceData);
            if (data.data.uri) window.location.href = data.data.uri
            else toast.error(getItem("Something_went_wrong_please_try_again"))

        } catch (error) {
            console.log(error);
            toast.error(getItem("Something_went_wrong_please_try_again"))
        } finally {
            stopLoading()
        }
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
            contactInfo={contactInfo}
            setContactInfo={setContactInfo}
            paymentType={paymentType}
            setPaymentType={setPaymentType}
        />
    )
}
