import { create } from "zustand";

type languageType = "en" | "ge"

export type layoutStore = {
    language: languageType,
    setLanguage: (language: languageType) => void,
};

const useLanguage = create<layoutStore>((set) => ({
    language: "en",
    setLanguage: (language) => set({ language }),
}));


export default useLanguage;