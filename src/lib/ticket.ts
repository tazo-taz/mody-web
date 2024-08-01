import { doc, getDoc } from "firebase/firestore"
import { sum } from "lodash"
import moment from "moment"
import queryString from "query-string"
import { getItem, languageData } from "../assets/language"
import { ticketChooseType } from "../components/ticket/card/simple/type"
import { db } from "../firebase"
import { busDatesType, busSystemDatesType, Discount } from "../hooks/firebase/useSearchTickets/types"
import { passengerType } from "../pages/tickets/bus/search"
import { myTicketsListSchema } from "../schemas/my-ticket"
import useAuth from "../stores/useAuth"
import { TicketApiEnum } from "../types/ticket"

const dateFormat = "yyyy-MM-DD"

export const formatDate = (date: string | Date) =>
    moment(date).format(dateFormat)

export const formatDateDayMonth = (date: string | Date) =>
    moment(date).format("ddd D")


export const getCityValueByName = (city?: string) => {
    if (city === languageData["Tbilisi"].ge || city === languageData["Tbilisi"].en) return languageData["Tbilisi"].ge
    if (city === languageData["Batumi"].ge || city === languageData["Batumi"].en) return languageData["Batumi"].ge
    if (city === languageData["Kutaisi_airport"].ge || city === languageData["Kutaisi_airport"].en) return languageData["Kutaisi_airport"].ge
    if (city === languageData["Kutaisi"].ge || city === languageData["Kutaisi"].en) return languageData["Kutaisi_airport"].ge

    if (city === languageData["Prague"].en || city === languageData["Prague"].ge) return languageData["Prague"].ge
    if (city === languageData["Kiev"].en || city === languageData["Kiev"].ge) return languageData["Kiev"].ge

    return undefined
}

export const getBysSystemCityValueByName = (city?: string) => {
    if (city === languageData["Kiev"].en || city === languageData["Kiev"].ge) return "3"
    if (city === languageData["Prague"].en || city === languageData["Prague"].ge) return "6"
}

export const getCityNameByValue = (value?: string) => {
    if (value === languageData["Kutaisi_airport"].ge) return getItem("Kutaisi_airport")
    if (value === languageData["Tbilisi"].ge) return getItem("Tbilisi")
    if (value === languageData["Batumi"].ge) return getItem("Batumi")
    return value || ""
}

export const getCityRoutes = (cityFrom?: string, cityTo?: string) => {
    const cityRoutes = [
        [{ value: languageData["Tbilisi"].ge, title: getItem("Tbilisi") }, { value: languageData["Kutaisi_airport"].ge, title: getItem("Kutaisi_airport") }],
        [{ value: languageData["Kutaisi_airport"].ge, title: getItem("Kutaisi_airport") }, { value: languageData["Batumi"].ge, title: getItem("Batumi") }],
    ]

    if (!cityFrom && cityTo) return [...new Set(cityRoutes.filter(cityArr => cityArr.find(city => city.value === cityTo)).flat())].filter((city) => city.value !== cityTo)
    else if (cityFrom && cityTo) return [...new Set(cityRoutes.filter(cityArr => cityArr.find(city => city.value === cityTo)).flat())].filter((city) => city.value !== cityTo)
    const flatCityRoutes = cityRoutes.flat()
    return flatCityRoutes.filter((city, inx) => {
        const index = flatCityRoutes.findIndex((c) => c.value === city.value)
        return index === inx
    })
}

export const transformTicketFormToQuery = (
    { cityFrom, cityTo, passenger = 1, child = 0, departureDate, returnDate }:
        { cityFrom?: string, cityTo?: string, passenger?: number, child?: number, departureDate?: Date, returnDate?: Date }
) => {
    if (cityFrom && cityTo && departureDate) {

        const query: any = {
            cityFrom,
            cityTo,
            passenger,
            child,
            departureDate: formatDate(departureDate),
            returnDate: null
        }

        if (returnDate)
            query.returnDate = formatDate(returnDate)

        const url = queryString.stringifyUrl({
            url: "/tickets/bus/search",
            query
        }, { skipNull: true })

        return url
    }

    return null
}

export const parseTicketQuery = (query: URLSearchParams) => {
    const cityFrom = query.get("cityFrom")
    const cityTo = query.get("cityTo")
    const passenger = query.get("passenger")
    const child = query.get("child")
    const departureDate = query.get("departureDate")
    const returnDate = query.get("returnDate")

    return {
        cityFrom: cityFrom || undefined,
        cityTo: cityTo || undefined,
        passenger: passenger ? +passenger : 1,
        child: child ? +child : 0,
        departureDate: departureDate ? new Date(departureDate) : undefined,
        departureDateString: departureDate ? formatDate(new Date(departureDate)) : undefined,
        returnDate: returnDate ? new Date(returnDate) : undefined,
        returnDateString: returnDate ? formatDate(new Date(returnDate)) : undefined,
    }
}

export type busDirectionType = {
    id: string,
    price: number,
    timeDiff: number
} | null

const TB_KU = {
    id: "1",
    price: 20,
    timeDiff: 3.5
}

const BA_KU = {
    id: "2",
    price: 20,
    timeDiff: 3.5
}

const KU_TB = {
    id: "3",
    price: 20,
    timeDiff: 3.5
}

const KU_BA = {
    id: "4",
    price: 20,
    timeDiff: 3.5
}


export const getBusDirectionByCities = (from?: string, to?: string): busDirectionType => {
    if ((from === languageData["Tbilisi"].ge && to === languageData["Kutaisi_airport"].ge) || (from === languageData["Tbilisi"].en && to === languageData["Kutaisi_airport"].en)) return TB_KU
    if ((from === languageData["Batumi"].ge && to === languageData["Kutaisi_airport"].ge) || (from === languageData["Batumi"].en && to === languageData["Kutaisi_airport"].en)) return BA_KU
    if ((from === languageData["Kutaisi_airport"].ge && to === languageData["Tbilisi"].ge) || (from === languageData["Kutaisi_airport"].en && to === languageData["Tbilisi"].en)) return KU_TB
    if ((from === languageData["Kutaisi_airport"].ge && to === languageData["Batumi"].ge) || (from === languageData["Kutaisi_airport"].en && to === languageData["Batumi"].en)) return KU_BA
    return null
}

export const getBusDirection = (id: number) => {
    if (id === 1) return TB_KU
    if (id === 2) return BA_KU
    if (id === 3) return KU_TB
    if (id === 4) return KU_BA
    return null
}

export const getStationByCity = (city: string) => {
    if ([languageData["Kutaisi_airport"].en, languageData["Kutaisi_airport"].ge].includes(city)) return getItem("Kutaisi_airport")
    if ([languageData["Tbilisi"].en, languageData["Tbilisi"].ge].includes(city)) return getItem("Tbilisi_Station_square_1")
    if ([languageData["Batumi"].en, languageData["Batumi"].ge].includes(city)) return getItem("Batumi_Station_2")

    return city
}

export const getTicketsFromBusDates = (busDates: busDatesType, departureDate: Date) => {
    const dateItems: { id: string, date: string }[] = []
    for (let id of Object.keys(busDates)) {
        const dates: any = busDates[id as any]

        dates
            .filter((date: string) => date.split(" ")[0] === formatDate(departureDate))
            .forEach((date: string) => {
                if (!dateItems.find((item) => item.date === date) && new Date(date).getTime() >= new Date().getTime())
                    dateItems.push({ id, date });
            })
    }

    return dateItems.sort((item1, item2) => {
        const time1 = sum(item1.date.split(" ")[1].split(":").map((time, inx) => {
            if (inx === 0) return +time * 60
            if (inx === 1) return +time
            return +time
        }))
        const time2 = sum(item2.date.split(" ")[1].split(":").map((time, inx) => {
            if (inx === 0) return +time * 60
            if (inx === 1) return +time
            return +time
        }))

        return time1 - time2
    })
}

export const getTicketsCount = (busDates: busDatesType, busSystemDates: busSystemDatesType[], departureDate: Date) => {
    const busDatesCount = getTicketsFromBusDates(busDates, departureDate).length
    return busDatesCount + busSystemDates.filter(({ date_from }) => {
        return formatDate(date_from) === formatDate(departureDate)
    }).length
}

export const filterUnfilledPassengers = (passengers: passengerType[]) =>
    passengers.filter(({ firstName, lastName }) => firstName && lastName)

export const calculateTicketsFullPrice = (passengersCount: number, price1: number = 0, price2: number = 0, fullPrice: boolean = false, activeDiscountIds: string[], discounts: Discount[] | null, ticket1Type: TicketApiEnum, ticket2Type: TicketApiEnum) => {
    const discountsPrices = (activeDiscountIds?.map((discountId) => {
        const { discount_price } = discounts?.find(({ discount_id }) => discount_id === discountId) || { discount_price: 0 }
        return discount_price
    }) || []).reduce((acc, price) => acc + price, 0)


    let discountPriceCalc = 0;

    if (ticket1Type === TicketApiEnum.BUS_SYSTEM) {
        discountPriceCalc = discountsPrices
    }
    if (ticket2Type === TicketApiEnum.BUS_SYSTEM) {
        discountPriceCalc += discountsPrices
    }

    let ticketsPrice = passengersCount * price1
    if (price2) {
        ticketsPrice += passengersCount * price2
    }
    const serviceFee = 0
    const priceWODiscount = ticketsPrice + serviceFee
    const discountPrice = priceWODiscount - discountPriceCalc
    const totalPrice = fullPrice ? priceWODiscount - discountPrice : ticketsPrice
    const discount = (discountPrice / priceWODiscount * 100).toFixed(0)

    return {
        totalPrice: totalPrice.toFixed(2),
        serviceFee: serviceFee.toFixed(2),
        ticketsPrice: ticketsPrice.toFixed(2),
        discountPrice: discountPrice.toFixed(2),
        discount
    }
}

export const getCitiesByTicketTitle = (name: string) => {
    const [from, to] = name.split(" - ")
    return [getCityNameByValue(from) || from, getCityNameByValue(to) || to]
}

export const getMyTickets = async () => {
    const user = useAuth.getState().user
    if (!user) return null
    const docRef = doc(db, "client-bus-tickets", user.uid);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
        const parsedData = myTicketsListSchema.parse(docSnapshot.data()?.items);
        return parsedData.reverse()
    }
    return null
}

export const isReserved = (seat: string, freeSeats: number[]) => {
    return freeSeats.includes(parseInt(seat))
}

export const isBusSystemApi = (ticket: ticketChooseType | null) => {
    return getTicketApiType(ticket) === TicketApiEnum.BUS_SYSTEM
}

export const isSomeOfBusSystemApi = (activeOutbound: ticketChooseType | null, activeReturn: ticketChooseType | null) => {
    return isBusSystemApi(activeOutbound) || isBusSystemApi(activeReturn)
}

const ticketHasSeatsPlan = (ticket: ticketChooseType | null) => {
    return isBusSystemApi(ticket) && (ticket!.metadata as busSystemDatesType).has_plan === 1
}

export const doesTicketsHasSeatsPlan = (activeOutbound: ticketChooseType | null, activeReturn: ticketChooseType | null) => {
    const validateTicket1 = ticketHasSeatsPlan(activeOutbound)
    const validateTicket2 = ticketHasSeatsPlan(activeReturn)
    return [validateTicket1 || validateTicket2, validateTicket1, validateTicket2]
}

export const validateTicketPassenger = (api: TicketApiEnum, passengers: passengerType[]) => {
    if (api === TicketApiEnum.BUS_SYSTEM) {
        return passengers.every(({ firstName, lastName, gender }) => firstName && lastName && gender)
    }
    return passengers.slice(0, 1).every(({ firstName, lastName }) => firstName && lastName)
}

export const getTicketApiType = (ticket: ticketChooseType | null) => {
    if (ticket?.metadata && "busSystem" in ticket.metadata) return TicketApiEnum.BUS_SYSTEM
    return TicketApiEnum.GEORGIAN_BUS
}

export const getActiveTicketsApiType = (activeOutbound: ticketChooseType | null, activeReturn: ticketChooseType | null): TicketApiEnum => {
    if (activeOutbound?.metadata && "busSystem" in activeOutbound.metadata) return TicketApiEnum.BUS_SYSTEM
    if (activeReturn?.metadata && "busSystem" in activeReturn.metadata) return TicketApiEnum.BUS_SYSTEM
    return TicketApiEnum.GEORGIAN_BUS
}

export const getDiscountsFromActive = (activeOutbound: ticketChooseType | null, activeReturn: ticketChooseType | null) => {
    if (activeOutbound?.metadata && "busSystem" in activeOutbound.metadata) return activeOutbound.metadata.discounts
    if (activeReturn?.metadata && "busSystem" in activeReturn.metadata) return activeReturn.metadata.discounts
    return null
}

export const isBothActiveTicketsBusSystem = (activeOutbound: ticketChooseType | null, activeReturn: ticketChooseType | null) => {
    const type1 = getActiveTicketsApiType(activeOutbound, null)
    const type2 = getActiveTicketsApiType(null, activeReturn)
    return type1 === TicketApiEnum.BUS_SYSTEM && type2 === TicketApiEnum.BUS_SYSTEM
}