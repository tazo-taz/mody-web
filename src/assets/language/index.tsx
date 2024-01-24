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
    Log_In: {
        en: "Log In",
        ge: "შესვლა"
    },
    Whats_your_number: {
        en: "What’s your number?",
        ge: "შეიყვანეთ თქვენი ნომერი"
    },
    If_you_dont_have_an_account_use_phone_registration_we_will_text_you_to_verify_your_phone_number: {
        en: "If you don’t have an account use phone registration. we will text you to verify your phone number",
        ge: "თუ არ გაქვთ ანგარიში, გამოიყენეთ ტელეფონის რეგისტრაცია. ჩვენ გამოგიგზავნით შეტყობინებას თქვენი ტელეფონის ნომრის დასადასტურებლად"
    },
    Phone_number: {
        en: "Phone number",
        ge: "ტელეფონის ნომერი"
    },
    Next: {
        en: "Next",
        ge: "შემდეგი"
    },
    Dont_have_an_account: {
        en: "Don’t have an account?",
        ge: "არ გაქვთ ანგარიში?"
    },
    Sign_Up: {
        en: "Sign Up",
        ge: "რეგისტრაცია"
    },
    Fill_in_the_fields: {
        en: "Fill in the fields",
        ge: "შეავსეთ ველები"
    },
    Enter_the_6_digit_code_sent_to_you_at: {
        en: "Enter the 6-digit code sent to you at",
        ge: "შეიყვანეთ თქვენთვის გამოგზავნილი 6-ნიშნა კოდი"
    },
    Resend_code: {
        en: "Resend code",
        ge: "კოდის თავიდან გაგზავნა"
    },
    Go_Back: {
        en: "Go Back",
        ge: "უკან დაბრუნება"
    },
}

export const getLanguageItem = (item: keyof typeof data) => {
    const language = useLanguage.getState()
    return data[item][language.language]
}