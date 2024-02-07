import moment from "moment"
import queryString from "query-string"
import { getLanguageItem } from "../assets/language"
import { busDatesType } from "../hooks/firebase/useSearchTickets"
import { sum } from "lodash"
import { BatumiGeo, KutaisiGeo, TbilisiGeo, BatumiEng, KutaisiEng, TbilisiEng } from "../assets/language/cities"
import { passengerType } from "../pages/tickets/bus/search"

const dateFormat = "yyyy-MM-DD"

export const getCityNameByValue = (value?: string) => {
    if (value === KutaisiGeo) return getLanguageItem("Kutaisi")
    if (value === TbilisiGeo) return getLanguageItem("Tbilisi")
    if (value === BatumiGeo) return getLanguageItem("Batumi")
    return ""
}

export const getCityRoutes = (cityFrom?: string, cityTo?: string) => {
    const cityRoutes = [
        [{ value: TbilisiGeo, title: getLanguageItem("Tbilisi") }, { value: KutaisiGeo, title: getLanguageItem("Kutaisi") }],
        [{ value: KutaisiGeo, title: getLanguageItem("Kutaisi") }, { value: BatumiGeo, title: getLanguageItem("Batumi") }],
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
    { cityFrom, cityTo, passenger, child, departureDate, returnDate }:
        { cityFrom?: string, cityTo?: string, passenger: number, child: number, departureDate?: Date, returnDate?: Date }
) => {
    if (cityFrom && cityTo && departureDate) {

        const query: any = {
            cityFrom,
            cityTo,
            passenger,
            child,
            departureDate: moment(departureDate).format(dateFormat),
            returnDate: null
        }

        if (returnDate)
            query.returnDate = moment(returnDate).format(dateFormat)

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
        departureDateString: departureDate ? moment(new Date(departureDate)).format(dateFormat) : undefined,
        returnDate: returnDate ? new Date(returnDate) : undefined,
        returnDateString: returnDate ? moment(new Date(returnDate)).format(dateFormat) : undefined,
    }
}

export type busDirectionType = {
    id: string,
    price: number,
    timeDiff: number
} | null

export const getBusDirection = (from: string, to: string): busDirectionType => {
    if (from === TbilisiGeo && to === KutaisiGeo) return {
        id: "1",
        price: 20,
        timeDiff: 3.5
    }
    if (from === BatumiGeo && to === KutaisiGeo) return {
        id: "2",
        price: 20,
        timeDiff: 3.5
    }
    if (from === KutaisiGeo && to === TbilisiGeo) return {
        id: "3",
        price: 20,
        timeDiff: 3.5
    }
    if (from === KutaisiGeo && to === BatumiGeo) return {
        id: "4",
        price: 20,
        timeDiff: 3.5
    }
    if (from === TbilisiEng && to === KutaisiEng) return {
        id: "1",
        price: 20,
        timeDiff: 3.5
    }
    if (from === BatumiEng && to === KutaisiEng) return {
        id: "2",
        price: 20,
        timeDiff: 3.5
    }
    if (from === KutaisiEng && to === TbilisiEng) return {
        id: "3",
        price: 20,
        timeDiff: 3.5
    }
    if (from === KutaisiEng && to === BatumiEng) return {
        id: "4",
        price: 20,
        timeDiff: 3.5
    }
    return null
}

export const getStationByCity = (city: string) => {
    if ([KutaisiEng, KutaisiGeo].includes(city)) return getLanguageItem("Kutaisi_airport")
    if ([TbilisiEng, TbilisiGeo].includes(city)) return getLanguageItem("Tbilisi_Station_square_1")
    if ([BatumiEng, BatumiGeo].includes(city)) return getLanguageItem("Batumi_Station_2")

    return null
}

export const getTicketsFromBusDates = (busDates: busDatesType, departureDate: Date) => {
    const dateItems: { id: string, date: string }[] = []
    for (let id of Object.keys(busDates)) {
        const dates: any = busDates[id as any]

        dates
            .filter((date: string) => date.split(" ")[0] === moment(departureDate).format(dateFormat))
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

export const filterPassengers = (passengers: passengerType[]) =>
    passengers.filter(({ firstName, lastName, userId }) => firstName && lastName && userId)

export const calculateTicketsFullPrice = (passengersCount: number, price1: number = 0, price2: number = 0, discountPercentage: number = 0) => {
    let ticketsPrice = passengersCount * price1
    if (price2) ticketsPrice *= 2
    const serviceFee = 5
    const priceWODiscount = ticketsPrice + serviceFee
    const discountPrice = priceWODiscount * discountPercentage / 100
    const totalPrice = priceWODiscount - discountPrice

    return {
        totalPrice: totalPrice.toFixed(2),
        serviceFee: serviceFee.toFixed(2),
        ticketsPrice: ticketsPrice.toFixed(2),
        discountPrice: discountPrice.toFixed(2),
    }
}