import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase";
import { loadUser } from "../lib/user";
import useUser from "../stores/useUser";

export default function useAuthStateChange() {
    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, async (user) => {
            if (user) {
                await loadUser()
            } else {
                useUser.setState({ isLoading: false })
            }
        });
        return subscriber;
    }, [])
}