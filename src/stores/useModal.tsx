import { create } from "zustand";
import { ticketSchemaType } from "../schemas/ticket";

export type modalStore = {
    modalType: "auth" | "purchased-ticket" | null
    data?: {
        ticket?: ticketSchemaType
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