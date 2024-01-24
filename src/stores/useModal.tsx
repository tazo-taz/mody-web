import { create } from "zustand";

export type modalStore = {
    modalType: "auth" | null
    onOpen: (modalType: modalStore["modalType"]) => void
    onClose: () => void
};

const useModal = create<modalStore>((set) => ({
    modalType: null,
    onOpen: (modalType) => set({ modalType }),
    onClose: () => set({ modalType: null }),
}));


export default useModal;