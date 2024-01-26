import queryString from "query-string"
import { getLanguageItem } from "../assets/language"
import moment from "moment"


export const getCityRoutes = (cityFrom?: string, cityTo?: string) => {
    const cityRoutes = [
        [getLanguageItem("Tbilisi"), getLanguageItem("Kutaisi")],
        [getLanguageItem("Kutaisi"), getLanguageItem("Batumi")],
    ]
    if (!cityFrom && cityTo) return [...new Set(cityRoutes.filter(cityArr => cityArr.includes(cityTo)).flat())].filter((city) => city !== cityTo)
    else if (cityFrom && cityTo) return [...new Set(cityRoutes.filter(cityArr => cityArr.includes(cityTo)).flat())].filter((city) => city !== cityTo)
    return [...new Set(cityRoutes.flat())]
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
            departureDate: moment(departureDate).format("yyyy-MM-DD"),
            returnDate: null
        }

        if (returnDate)
            query.returnDate = moment(returnDate).format("yyyy-MM-DD")

        const url = queryString.stringifyUrl({
            url: "/tickets/bus/search",
            query
        }, { skipNull: true })

        return url
    }

    return null
}

export const getTicketQuery = (query: URLSearchParams) => {
    const cityFrom = query.get("cityFrom")
    const cityTo = query.get("cityTo")
    const passenger = query.get("passenger")
    const child = query.get("child")
    const departureDate = query.get("departureDate")
    const returnDate = query.get("returnDate")

    return {
        cityFrom: cityFrom || undefined,
        cityTo: cityTo || undefined,
        passenger: passenger ? +passenger : 0,
        child: child ? +child : 0,
        departureDate: departureDate ? new Date(departureDate) : undefined,
        returnDate: returnDate ? new Date(returnDate) : undefined,
    }
}