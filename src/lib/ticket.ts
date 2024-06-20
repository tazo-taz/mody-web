import { sum } from "lodash"
import moment from "moment"
import queryString from "query-string"
import { getLanguageItem, languageData } from "../assets/language"
import { passengerType } from "../pages/tickets/bus/search"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import useAuth from "../stores/useAuth"
import { ticketsListSchema } from "../schemas/ticket"
import { busDatesType } from "../hooks/firebase/useSearchTickets/types"

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

    return undefined
}

export const getBysSystemCityValueByName = (city?: string) => {
    if (city === languageData["Tbilisi"].ge || city === languageData["Tbilisi"].en) return "3"
    if (city === languageData["Batumi"].ge || city === languageData["Batumi"].en) return "2"
    if (city === languageData["Kutaisi_airport"].ge || city === languageData["Kutaisi_airport"].en) return "6"
    if (city === languageData["Kutaisi"].ge || city === languageData["Kutaisi"].en) return "6"

}

export const getCityNameByValue = (value?: string) => {
    if (value === languageData["Kutaisi_airport"].ge) return getLanguageItem("Kutaisi_airport")
    if (value === languageData["Tbilisi"].ge) return getLanguageItem("Tbilisi")
    if (value === languageData["Batumi"].ge) return getLanguageItem("Batumi")
    return value || ""
}

export const getCityRoutes = (cityFrom?: string, cityTo?: string) => {
    const cityRoutes = [
        [{ value: languageData["Tbilisi"].ge, title: getLanguageItem("Tbilisi") }, { value: languageData["Kutaisi_airport"].ge, title: getLanguageItem("Kutaisi_airport") }],
        [{ value: languageData["Kutaisi_airport"].ge, title: getLanguageItem("Kutaisi_airport") }, { value: languageData["Batumi"].ge, title: getLanguageItem("Batumi") }],
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
    if ([languageData["Kutaisi_airport"].en, languageData["Kutaisi_airport"].ge].includes(city)) return getLanguageItem("Kutaisi_airport")
    if ([languageData["Tbilisi"].en, languageData["Tbilisi"].ge].includes(city)) return getLanguageItem("Tbilisi_Station_square_1")
    if ([languageData["Batumi"].en, languageData["Batumi"].ge].includes(city)) return getLanguageItem("Batumi_Station_2")

    return null
}

export const getTicketsFromBusDates = (busDates: busDatesType, departureDate: Date) => {
    const dateItems: { id: string, date: string }[] = []
    for (let id of Object.keys(busDates)) {
        const dates: any = busDates[id as any]

        dates
            .filter((date: string) => date.split(" ")[0] === formatDate(departureDate))
            .forEach((date: string) => {
                if (!dateItems.find((item) => item.date === date))
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

export const filterUnfilledPassengers = (passengers: passengerType[]) =>
    passengers.filter(({ firstName, lastName, userId }) => firstName && lastName && userId)

export const calculateTicketsFullPrice = (passengersCount: number, price1: number = 0, price2: number = 0, fullPrice: boolean = false) => {
    let ticketsPrice = passengersCount * price1
    if (price2) ticketsPrice *= 2
    const discount = 0;
    const serviceFee = 0
    const priceWODiscount = ticketsPrice + serviceFee
    const discountPrice = priceWODiscount * discount / 100
    const totalPrice = fullPrice ? priceWODiscount - discountPrice : ticketsPrice

    return {
        totalPrice: totalPrice.toFixed(2),
        serviceFee: serviceFee.toFixed(2),
        ticketsPrice: ticketsPrice.toFixed(2),
        discountPrice: discountPrice.toFixed(2),
        discount
    }
}

export const getCitiesByName = (name: string) => {
    const [from, to] = name.split(" - ")
    return {
        cityFrom: getCityNameByValue(from),
        cityTo: getCityNameByValue(to),
    }
}

export const getMyTickets = async () => {
    const user = useAuth.getState().user
    if (!user) return null
    const docRef = doc(db, "client-bus-tickets", user.uid);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
        const parsedData = ticketsListSchema.parse(docSnapshot.data()?.items);
        return parsedData.reverse()
    }
    return null
}