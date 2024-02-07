import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import useLanguage from "../stores/useLanguage";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

let overflow = 0

export const hideScrollbar = () => {
    document.body.style.overflow = "hidden"
    overflow--
}

export const showScrollbar = () => {
    overflow++
    if (!overflow)
        document.body.style.overflow = ""
}

export const scrollToTop = () => document.querySelector("html")!.scrollTop = 0

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


export const objChange = <T extends {}>(
    obj: T,
    key: keyof T,
    value: string
): T => {
    return {
        ...obj,
        [key]: value,
    };
};

export const objValueChange = <T extends {}>(
    onChange: React.Dispatch<React.SetStateAction<T>>,
    key: keyof T,
): ((value: string) => void) => {
    return (value: string) => onChange((obj) => ({
        ...obj,
        [key]: value,
    }));
};
