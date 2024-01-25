import { languageStore, languageType } from "../stores/useLanguage";

export const switchLanguage = (language: languageType, setLanguage: languageStore["setLanguage"]) => {
    if (language === "en") setLanguage("ge")
    if (language === "ge") setLanguage("en")
}