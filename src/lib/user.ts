import { signOut as signOutAuth } from "firebase/auth";
import toast from "react-hot-toast";
import { getItem } from "../assets/language";
import { auth, functions, uploadFile } from "../firebase";
import { userSchema } from "../schemas/user";
import useAuth from "../stores/useAuth";
export const loadUser = async () => {
    const res = await functions("MyInfo")

    if (res.data.result) {
        try {
            const user = userSchema.parse(res.data.user)
            useAuth.setState({ user, isLoading: false })
        } catch (error) {
            console.log(error);
            useAuth.setState({ isLoading: false })
            toast.error(getItem("Something_went_wrong_please_try_again_or_contact_us"))
        }
    } else {
        useAuth.setState({ isLoading: false })
    }
}

export const signOut = async () => {
    await signOutAuth(auth)
    useAuth.setState({ user: null, isLoading: false })
    toast.success(getItem("Successfully_logged_out"))
}

export const uploadProfileImage = async (image: File) => {
    const uid = useAuth.getState().user?.uid
    await uploadFile(image, `/tmp/${uid}/avatar.png`)
}