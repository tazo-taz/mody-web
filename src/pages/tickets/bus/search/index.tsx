import { useEffect, useState } from 'react';
import { ticketChooseType } from '../../../../components/ticket/card/simple';
import toast from 'react-hot-toast';
import useLanguage from '../../../../stores/useLanguage';
import TicketDetailsScreen from './screens/details';
import useQuery from '../../../../hooks/useQuery';
import { filterUnfilledPassengers, getMyTickets, parseTicketQuery } from '../../../../lib/ticket';
import useAuth from '../../../../stores/useAuth';
import TicketPayScreen from './screens/pay';
import { userSchemaType } from '../../../../schemas/user';
import { functions } from '../../../../firebase';
import { startLoading, stopLoading } from '../../../../references/loading';
import useModal from '../../../../stores/useModal';
import useOpen from '../../../../hooks/useOpen';
import ActiveTicketInfoModalContent from '../../../../components/ticket/active-ticket-info/modal-content';
import TicketsSearchScreen from './screens/search';
import TicketHeader from '../../../../components/ticket/header';
import { languageData } from '../../../../assets/language';
import Breadcrumbs from '../../../../components/breadcrumbs';

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

export type typePaymentType = "new" | number | null

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

    const { isOpen: isActiveTicketInfoOpen, toggle: toggleActiveTicketInfo } = useOpen(true)


    useEffect(() => {
        if (auth.user) {
            const { firstName, phoneNumber, email } = auth.user
            setContactInfo({ firstName, phoneNumber: phoneNumber.slice(3), email: email || "" })
        }
    }, [auth.user])

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
                requestId: `8d24ade2-3e37-4d45-bba1-8ddf7deb86a1`,
                driverAppCallbackUrl: `${window.location.origin}/account/my-tickets`
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

            payBusPriceData.adultPassengers = filterUnfilledPassengers(adultPassengers)
            payBusPriceData.childPassengers = filterUnfilledPassengers(childPassengers)

            const data = await functions('payBusPrice', payBusPriceData);

            if (paymentType === "new") {
                if (data.data.uri) window.location.href = data.data.uri
                else toast.error(getItem("Something_went_wrong_please_try_again_or_contact_us"))
            } else {
                if (data.data.result) {
                    const myTickets = await getMyTickets()
                    if (myTickets) {
                        modal.onOpen("purchased-ticket", { ticket: myTickets[0] })
                    }
                }
                else toast.error(getItem("Something_went_wrong_please_try_again_or_contact_us"))
            }


        } catch (error) {
            console.log(error);
            toast.error(getItem("Something_went_wrong_please_try_again_or_contact_us"))
        } finally {
            stopLoading()
        }
    }

    let currentScreen: React.ReactNode = (
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
                onContinue={searchToDetailsScreen}
            />
        )

        onContinueCB = searchToDetailsScreen
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
                            { id: screenEnum.DETAILS, title: getItem("Passenger_details") },
                            { id: screenEnum.PAY, title: getItem("Review_and_pay") },
                        ]}
                        active={screen}
                        choose={(screen) => {
                            if (screen === screenEnum.PAY) { }
                            else setScreen(screen)
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
            />
        </>
    )
}
