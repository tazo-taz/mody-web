import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase";

export default function useAuthStateChange() {
    useEffect(() => {



        const subscriber = onAuthStateChanged(auth, (user) => {
            console.log({ user });

            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // ...
                console.log("uid", uid)
            } else {
                // User is signed out
                // ...
                console.log("user is logged out")
            }
        });
        return subscriber;
    }, [])
}