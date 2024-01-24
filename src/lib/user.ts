import toast from "react-hot-toast";
import { auth, functions } from "../firebase"
import { userSchema } from "../schemas/user";
import { getLanguageItem } from "../assets/language";
import useUser from "../stores/useUser";
import { signOut as signOutAuth } from "firebase/auth"

export const loadUser = async () => {
    const res = await functions("MyInfo")

    if (res.data.result) {
        try {
            const user = userSchema.parse(res.data.user)
            useUser.setState({ user, isLoading: false })

        } catch (error) {
            console.log(error);
            useUser.setState({ isLoading: false })
            toast.error(getLanguageItem("Something_went_wrong_please_try_again"))
        }
    } else {
        useUser.setState({ isLoading: false })
    }
}

export const signOut = async () => {
    await signOutAuth(auth)
    useUser.setState({ user: null, isLoading: false })
    toast.success(getLanguageItem("Successfully_logged_out"))
}