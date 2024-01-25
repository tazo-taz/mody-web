import { create } from "zustand";
import { languageData } from "../assets/language";

export type languageType = "en" | "ge"

export type languageStore = {
    language: languageType,
    setLanguage: (language: languageType) => void,
    getItem: (item: keyof typeof languageData) => string
};

const useLanguage = create<languageStore>((set, get) => ({
    language: "en",
    setLanguage: (language) => set({ language }),
    getItem: (item) => languageData[item][get().language]
}));


export default useLanguage;