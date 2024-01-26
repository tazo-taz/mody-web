import queryString from "query-string"
import { getLanguageItem } from "../assets/language"


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
        console.log("xx");
        queryString.stringifyUrl({
            url: "/tickets/bus",
            query: {
                cityFrom,
                cityTo,
                passenger,
                child,
                // returnDate
            }
        })
    }
}