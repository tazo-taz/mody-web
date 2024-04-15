import { create } from "zustand";
import { ticketSchemaType } from "../schemas/ticket";
import { LooseValue } from "react-calendar/dist/cjs/shared/types";

export type modalStore = {
    modalType: "auth" | "purchased-ticket" | "calendar" | "update-phone" | null
    data?: {
        ticket?: ticketSchemaType,
        calendar?: {
            ownOnChange: (date: LooseValue) => void,
            value: Date | undefined
        },
        phone?: number
    }
    onOpen: (modalType: modalStore["modalType"], data?: modalStore["data"]) => void
    onClose: () => void
};

const useModal = create<modalStore>((set) => ({
    modalType: null,
    onOpen: (modalType, data) => set({ modalType, data }),
    onClose: () => set({ modalType: null }),
}));


export default useModal;