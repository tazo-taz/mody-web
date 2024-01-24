import { create } from "zustand";
import { userSchemaType } from "../schemas/user";

export type userStore = {
    user: userSchemaType | null
    isLoading: boolean
    // setUser: (user: userStore["user"]) => void
};

const useUser = create<userStore>((set) => ({
    user: null,
    isLoading: true,
    // setUser: (user) => set({ user, isLoading: false }),
}));


export default useUser;