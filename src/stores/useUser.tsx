import { create } from "zustand";
import { userSchemaType } from "../schemas/user";

export type userStore = {
    user: null
    isLoading: true
} | {
    user: null
    isLoading: false
} | {
    user: userSchemaType
    isLoading: false
};

const useUser = create<userStore>((set) => ({
    user: null,
    isLoading: true,
}));


export default useUser;