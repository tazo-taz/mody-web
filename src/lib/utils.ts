import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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