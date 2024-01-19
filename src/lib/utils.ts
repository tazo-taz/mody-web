import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

let oldOverflow = ""

export const toggleHideScrollbar = () => {
    if (document.body.style.overflow === "hidden") {
        document.body.style.overflow = oldOverflow
    } else {
        if (!oldOverflow) oldOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
    }
}