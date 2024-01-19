import useLanguage from "../../stores/useLanguage"

const data = {
    Find_Official_Tickets: {
        en: "Find Official \nTickets",
        ge: "მოძებნეთ ოფიციალური \nბილეთები"
    },
    Search_your_ticket: {
        en: "Search your ticket",
        ge: "მოძებნეთ თქვენი ბილეთი"
    },
    Search_ticket: {
        en: "Search ticket",
        ge: "მოძებნეთ ბილეთი"
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
    Travel_That_Moves_You: {
        en: "Travel That Moves You",
        ge: "მოგზაურობა, რომელიც გიბიძგებს"
    },
    One_app_for_every_step_of_your_journey_travel_planning_has_never_been_easier: {
        en: "One app for every step of your journey—travel planning has never been easier!",
        ge: "აპლიკაცია თქვენი მოგზაურობის ყოველი ნაბიჯისთვის - მოგზაურობის დაგეგმვა არასოდეს ყოფილა ადვილი!"
    },
    Our_Services: {
        en: "Our Services",
        ge: "ჩვენი სერვისები"
    },
    Bus: {
        en: "Bus",
        ge: "ავტობუსი"
    },
    Train: {
        en: "Train",
        ge: "მატარებელი"
    },
    Minibus: {
        en: "Minibus",
        ge: "მიკროავტობუსი"
    },
    Fly: {
        en: "Fly",
        ge: "თვითმფრინავი"
    },
    Car_Rent: {
        en: "Car Rent",
        ge: "მანქანის გაქირავება"
    },
    Terms_and_Conditions: {
        en: "Terms & Conditions",
        ge: "წესები და პირობები"
    },
    Privacy: {
        en: "Privacy",
        ge: "კონფიდენციალურობა"
    },
    About_Us: {
        en: "About Us",
        ge: "ჩვენს შესახებ"
    },
    Mody_All_rights_reserved: {
        en: "© 2024 Mody. All rights reserved.",
        ge: "© 2024 Mody. ყველა უფლება დაცულია."
    },
    Currency: {
        en: "Currency",
        ge: "ვალუტა"
    },
    Language: {
        en: "Language",
        ge: "ენა"
    },
    USD: {
        en: "USD",
        ge: "USD"
    },
    GEL: {
        en: "GEL",
        ge: "ლარი"
    },
    ENG: {
        en: "ENG",
        ge: "ინგ"
    },
    GEO: {
        en: "GEO",
        ge: "ქარ"
    },
}

export const getLanguageItem = (item: keyof typeof data) => {
    const language = useLanguage.getState()
    return data[item][language.language]
}