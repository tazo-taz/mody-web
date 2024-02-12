import { signOut as signOutAuth } from "firebase/auth";
import toast from "react-hot-toast";
import { auth, functions } from "../firebase";
import { userSchema } from "../schemas/user";
import useLanguage from "../stores/useLanguage";
import useAuth from "../stores/useAuth";
import { getLanguageItem } from "../assets/language";

export const loadUser = async () => {
    const res = await functions("MyInfo")

    if (res.data.result) {
        try {
            const user = userSchema.parse(res.data.user)
            useAuth.setState({ user, isLoading: false })

        } catch (error) {
            console.log(error);
            useAuth.setState({ isLoading: false })
            toast.error(getLanguageItem("Something_went_wrong_please_try_again_or_contact_us"))
        }
    } else {
        useAuth.setState({ isLoading: false })
    }
}

export const signOut = async () => {
    await signOutAuth(auth)
    useAuth.setState({ user: null, isLoading: false })
    toast.success(getLanguageItem("Successfully_logged_out"))
}