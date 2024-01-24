import { create } from "zustand";

export type useHeaderMenuOpenType = {
    isOpen: boolean
    toggle: () => void
};

const useHeaderMenuOpen = create<useHeaderMenuOpenType>((set) => ({
    isOpen: false,
    toggle: () => set(oldState => ({ ...oldState, isOpen: !oldState["isOpen"] })),

}));


export default useHeaderMenuOpen;