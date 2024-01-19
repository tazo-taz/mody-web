import useLanguage from "../../stores/useLanguage"

const data = {
    Find_Official_Tickets: {
        en: "Find Official \nTickets",
        ge: "მოძებნეთ ოფიციალური \nბილეთები"
    },
    Search_your_ticket: {
        en: "Search your ticket",
        ge: "მოძებნეთ თქვენი ბილეთები"
    },
    From: {
        en: "From",
        ge: "დან"
    },
    To: {
        en: "To",
        ge: "ში"
    },
    Tbilisi: {
        en: "Tbilisi",
        ge: "თბილისი"
    },
    Batumi: {
        en: "Batumi",
        ge: "ქუთაისი"
    },
    Kutaisi: {
        en: "Kutaisi",
        ge: "ბათუმი"
    },
    Passenger: {
        en: "Passenger",
        ge: "მგზავრი"
    },
    Child: {
        en: "Child",
        ge: "ბავშვი"
    },
    ten_years_above: {
        en: "10 years above",
        ge: "10 წლიდან ზემოთ"
    },
    five_to_ten_years: {
        en: "5-10 years",
        ge: "5-10 წლამდე"
    },
    Search: {
        en: "Search",
        ge: "ძებნა"
    },
    Child_passenger_information: {
        en: "Child passenger information",
        ge: "ინფორმაცია ბავშვ მგზავრზე"
    },
    Departure: {
        en: "Departure",
        ge: "გამგზავრება"
    },
    Return: {
        en: "Return",
        ge: "დაბრუნება"
    },
    Travel_that_moves_you: {
        en: "Travel_that_moves_you",
        ge: "მოგზაურობა, რომელიც გიბიძგებს"
    },
}

export const getLanguageItem = (item: keyof typeof data) => {
    const language = useLanguage.getState()
    return data[item][language.language]
}