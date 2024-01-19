import { getLanguageItem } from "../assets/language"

export const cityRoutes = [
    [getLanguageItem("Tbilisi"), getLanguageItem("Kutaisi")],
    [getLanguageItem("Kutaisi"), getLanguageItem("Batumi")],
]

export const getCityRoutes = (cityFrom?: string, cityTo?: string) => {
    if (!cityFrom && cityTo) return [...new Set(cityRoutes.filter(cityArr => cityArr.includes(cityTo)).flat())].filter((city) => city !== cityTo)
    else if (cityFrom && cityTo) return [...new Set(cityRoutes.filter(cityArr => cityArr.includes(cityTo)).flat())].filter((city) => city !== cityTo)
    return [...new Set(cityRoutes.flat())]
}