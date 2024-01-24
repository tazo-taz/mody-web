import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import useLanguage from "../stores/useLanguage";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

let oldOverflow = ""


export const hideScrollbar = () => {
    if (!oldOverflow) oldOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
}

export const showScrollbar = () => {
    document.body.style.overflow = oldOverflow
}

export const fillTheField = (fieldType: string) => {
    const lang = useLanguage.getState().language

    if (lang === "en") {
        return `Please fill the ${fieldType} field`
    }

    return `შეიყვანეთ ${fieldType}ს ველი`
}

export const delay = (delayInms: number) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};