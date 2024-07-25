import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { languageData } from '../../../../assets/language';
import Breadcrumbs from '../../../../components/breadcrumbs';
import ActiveTicketInfoModalContent from '../../../../components/ticket/active-ticket-info/modal-content';
import { ticketChooseType } from '../../../../components/ticket/card/simple/type';
import TicketHeader from '../../../../components/ticket/header';
import useOpen from '../../../../hooks/useOpen';
import useQuery from '../../../../hooks/useQuery';
import { filterUnfilledPassengers, parseTicketQuery } from '../../../../lib/ticket';
import { startLoading, stopLoading } from '../../../../references/loading';
import { userSchemaType } from '../../../../schemas/user';
import useAuth from '../../../../stores/useAuth';
import useLanguage from '../../../../stores/useLanguage';
import useModal from '../../../../stores/useModal';
import TicketDetailsScreen from './screens/details';
import TicketPayScreen from './screens/pay';
import TicketsSearchScreen from './screens/search';
import TicketSeatsScreen from './screens/seats';

// TODO: Divide kutaisi into kutaisi and kutaisi airport

export enum screenEnum {
    SEARCH,
    SEATS,
    DETAILS,
    PAY
}

export type passengerType = {
    firstName: string,
    lastName: string,
    userId: string | null,
    save: boolean
}

export type typePaymentType = "new" | "cash" | number | null

export type contactInfoType = Pick<userSchemaType, "email" | "firstName" | "phoneNumber"> & { email: string }

export default function BusTicketsSearchPage() {
    const [screen, setScreen] = useState<screenEnum>(screenEnum.SEARCH)
    const query = useQuery()
    let ticketQuery = parseTicketQuery(query)

    const { getItem } = useLanguage()
    const auth = useAuth()
    const modal = useModal()

    const [activeOutbound, setActiveOutbound] = useState<ticketChooseType | null>(null)
    const [activeReturn, setActiveReturn] = useState<ticketChooseType | null>(null)
    const [adultPassengers, setAdultPassengers] = useState<passengerType[]>([])
    const [childPassengers, setChildPassengers] = useState<passengerType[]>([])
    const [paymentType, setPaymentType] = useState<typePaymentType>(null)
    const [contactInfo, setContactInfo] = useState<contactInfoType>({
        email: "",
        firstName: "",
        phoneNumber: ""
    })
    const [activeOutboundSeats, setActiveOutboundSeats] = useState<(string | undefined)[]>([])
    const [activeReturnSeats, setActiveReturnSeats] = useState<(string | undefined)[]>([])

    const { isOpen: isActiveTicketInfoOpen, toggle: toggleActiveTicketInfo } = useOpen(true)
    const boundTicketHasSeats = activeOutbound && "busSystem" in activeOutbound.metadata && activeOutbound.metadata.bustype !== "no_plan"
    const returnTicketHasSeats = activeReturn && "busSystem" in activeReturn.metadata && activeReturn.metadata.bustype !== "no_plan"

    useEffect(() => {
        if (auth.user) {
            const { firstName, phoneNumber, email } = auth.user
            setContactInfo({ firstName, phoneNumber: phoneNumber.slice(3), email: email || "" })
        }
    }, [auth.user])


    const screenValidators = {
        toDetails() {
            if (boundTicketHasSeats || returnTicketHasSeats) {
                const { child, passenger } = parseTicketQuery(query)
                const passengersAmount = child + passenger

                const outboudSeatsFilled = activeOutboundSeats.filter(a => a !== undefined).length === passengersAmount
                const returnSeatsFilled = returnTicketHasSeats ? activeReturnSeats.filter(a => a !== undefined).length === passengersAmount : true

                if (!outboudSeatsFilled) {
                    toast.error(getItem("Choose_outbound_seats"))
                    return false
                }
                if (!returnSeatsFilled) {
                    toast.error(getItem("Choose_return_seats"))
                    return false
                }

                return true
            }
        },
        toPay() {
            const mainPassenger = adultPassengers[0]
            if (mainPassenger.firstName && mainPassenger.lastName && mainPassenger.userId) {
                return true
            }
            return false
        }
    }


    console.log(returnTicketHasSeats, boundTicketHasSeats);
    const searchToNextScreen = () => {
        const { child, passenger } = parseTicketQuery(query)
        const passengersAmount = child + passenger

        if (activeOutbound && shouldContinueToDetailsScreen()) {
            if (returnTicketHasSeats || boundTicketHasSeats) {
                setActiveOutboundSeats([...new Array(passengersAmount)])
                if (returnTicketHasSeats) setActiveReturnSeats([...new Array(passengersAmount)])
                return setScreen(screenEnum.SEATS)
            }
            return toDetailsScreen()
        }

        toast.error(getItem("Choose_tickets"))
    }

    const shouldContinueToDetailsScreen = () => {
        return (parseTicketQuery(query).returnDate && activeReturn) || !parseTicketQuery(query).returnDate
    }

    const handleToDetailsScreenFromSeats = () => {
        if (boundTicketHasSeats || returnTicketHasSeats) {
            const validated = screenValidators.toDetails()
            if (validated) {
                return toDetailsScreen()
            }
        }
    }

    const toDetailsScreen = () => {
        const { child, passenger } = parseTicketQuery(query)

        if (shouldContinueToDetailsScreen()) {
            const adultPassengers: passengerType[] = [...new Array(passenger)].map(() => ({
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
    }

    const detailsToReviewScreen = () => {
        if (screenValidators.toPay()) {
            setScreen(screenEnum.PAY)
            return true
        }
        toast.error(getItem("Fill_main_passenger_information"))
        return false
    }

    const handlePay = async () => {

        if (!activeOutbound) {
            return toast.error(getItem("Choose_tickets"))
        }
        try {
            startLoading()

            if (paymentType === null) {
                return toast.error(getItem("Choose_payment_method"))
            }

            let item: any

            if ("busSystem" in activeOutbound?.metadata) {
                item = {
                    date: activeOutbound.metadata.date_from,
                    interval_id: activeOutbound.metadata.interval_id,
                    seat: activeOutboundSeats
                }
            } else {
                item = {
                    busDirectionId: activeOutbound?.metadata?.busDirection!.id,
                    date: activeOutbound!.date,
                    flightId: activeOutbound!.id
                }
            }

            const payBusPriceData: any = {
                item,
                paymentType,
                adult: `${adultPassengers.length}`,
                child: `${childPassengers.length}`,
                driverAppCallbackUrl: `${window.location.origin}/account/my-tickets`
            }

            if (adultPassengers[0].save) {
                payBusPriceData.info = {
                    firstNameValue: adultPassengers[0].firstName,
                    lastNameValue: adultPassengers[0].lastName,
                    userIdValue: adultPassengers[0].userId,
                }
            }

            if (activeReturn) {
                let returnItem: any

                if ("busSystem" in activeReturn.metadata) {
                    returnItem = {
                        date: activeReturn.metadata.date_from,
                        interval_id: activeReturn.metadata.interval_id,
                        seat: activeReturnSeats
                    }
                } else {
                    returnItem = {
                        busDirectionId: activeReturn.metadata.busDirection!.id,
                        date: activeReturn.date,
                        flightId: activeReturn.id
                    }
                }

                payBusPriceData.returnItem = returnItem
            }

            payBusPriceData.adultPassengers = filterUnfilledPassengers(adultPassengers)
            payBusPriceData.childPassengers = filterUnfilledPassengers(childPassengers)

            console.log(JSON.stringify(payBusPriceData));

            // const data = await functions('payBusPrice', payBusPriceData);

            // if (paymentType === "new") {
            //     if (data.data.uri) window.location.href = data.data.uri
            //     else toast.error(getItem("Something_went_wrong_please_try_again_or_contact_us"))
            // } else {
            //     console.log(data);

            //     if (data.data.result) {
            //         const myTickets = await getMyTickets()
            //         if (myTickets) {
            //             modal.onOpen("purchased-ticket", { ticket: myTickets[0] })
            //         }
            //     }
            //     else
            //         toast.error(getItem(data.data.message?.error) || getItem("Something_went_wrong_please_try_again_or_contact_us"))
            // }
        } catch (error) {
            console.log(error);
            toast.error(getItem("Something_went_wrong_please_try_again_or_contact_us"))
        } finally {
            stopLoading()
        }
    }

    let currentScreen: React.ReactNode = (
        <TicketPayScreen
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

    let onContinueCB: () => void = handlePay
    let buttonTitle: keyof typeof languageData = "Pay_now"
    let goBack: (() => void) | undefined = () => setScreen(screenEnum.DETAILS)

    if (screen === screenEnum.SEARCH) {
        currentScreen = (
            <TicketsSearchScreen
                activeOutbound={activeOutbound}
                activeReturn={activeReturn}
                setActiveOutbound={setActiveOutbound}
                setActiveReturn={setActiveReturn}
                onContinue={searchToNextScreen}
            />
        )

        onContinueCB = searchToNextScreen
        buttonTitle = "Continue"
        goBack = undefined
    } else if (screen === screenEnum.DETAILS) {
        currentScreen = (
            <TicketDetailsScreen
                setScreen={setScreen}
                activeOutbound={activeOutbound}
                activeReturn={activeReturn}
                detailsToReviewScreen={detailsToReviewScreen}
                adultPassengers={adultPassengers}
                childPassengers={childPassengers}
                setAdultPassengers={setAdultPassengers}
                setChildPassengers={setChildPassengers}
            />
        )

        onContinueCB = detailsToReviewScreen
        buttonTitle = "Review_Journey_Details"
        goBack = () => setScreen(screenEnum.SEARCH)
    } else if (screen === screenEnum.SEATS) {
        currentScreen = (
            <TicketSeatsScreen
                setScreen={setScreen}
                activeOutbound={activeOutbound}
                activeReturn={activeReturn}
                detailsToReviewScreen={handleToDetailsScreenFromSeats}
                adultPassengers={adultPassengers}
                childPassengers={childPassengers}
                setAdultPassengers={setAdultPassengers}
                setChildPassengers={setChildPassengers}
                setActiveOutboundSeats={setActiveOutboundSeats}
                activeOutboundSeats={activeOutboundSeats}
                activeReturnSeats={activeReturnSeats}
                setActiveReturnSeats={setActiveReturnSeats}
            />
        )
    }

    const activeDate = activeOutbound?.date ? new Date(activeOutbound?.date) : ticketQuery.departureDate

    return (
        <>
            <TicketHeader
                onClick={goBack}
                {...ticketQuery}
                departureDate={activeDate}
            />

            {screen !== screenEnum.SEARCH && (
                <div className='shadow-md z-[1] relative bg-white'>
                    <Breadcrumbs
                        className='h-[90px] container mx-auto md:flex hidden'
                        data={[
                            { id: screenEnum.SEARCH, title: getItem("Search") },
                            boundTicketHasSeats && { id: screenEnum.SEATS, title: getItem("Seats") },
                            { id: screenEnum.DETAILS, title: getItem("Passenger_details") },
                            { id: screenEnum.PAY, title: getItem("Review_and_pay") },
                        ]}
                        active={screen}
                        choose={(newScreen) => {
                            if (newScreen === screenEnum.SEARCH) {
                                setScreen(newScreen)
                                return
                            }
                            else if (newScreen === screenEnum.SEATS) {
                                setScreen(newScreen)
                            }
                            else if (newScreen === screenEnum.DETAILS) {
                                if (screenValidators.toDetails()) {
                                    setScreen(newScreen)
                                }
                            } else if (newScreen === screenEnum.PAY) {
                                if (screenValidators.toDetails() && screenValidators.toPay()) {
                                    detailsToReviewScreen()
                                }
                            }
                        }}
                    />
                </div>
            )}

            {currentScreen}

            <ActiveTicketInfoModalContent
                outboundTicket={activeOutbound}
                returnTicket={activeReturn}
                onContinue={onContinueCB}
                toggleActiveTicketInfo={toggleActiveTicketInfo}
                isActiveTicketInfoOpen={isActiveTicketInfoOpen}
                buttonTitle={buttonTitle}
                fullDetails={screen === screenEnum.PAY}
            />
        </>
    )
}
