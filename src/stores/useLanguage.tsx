import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { languageData } from "../assets/language";

export type languageType = "en" | "ge"

export type languageStore = {
    language: languageType,
    setLanguage: (language: languageType) => void,
    getItem: (item: keyof typeof languageData) => string
};

const useLanguage = create(persist<languageStore>(
    (set, get) => ({
        language: "en",
        setLanguage: (language) => set({ language }),
        getItem: (item) => {
            const translated = languageData[item][get().language]
            return translated
        }
    }),
    { name: 'lang' }
));


export default useLanguage;