import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import CameraIcon from '../../../assets/images/svgs/icons/camera'
import AccountCard from '../../../components/account/card'
import AccountTitle from '../../../components/account/title'
import Button from '../../../components/fields/button'
import UserProfile from '../../../components/user-profile'
import { functions } from '../../../firebase'
import useUserForm from '../../../hooks/forms/useUserForm'
import { loadUser, uploadProfileImage } from '../../../lib/user'
import { startLoading, stopLoading } from '../../../references/loading'
import { unregisteredUserSchemaType } from '../../../schemas/user'
import useAuth from '../../../stores/useAuth'
import useLanguage from '../../../stores/useLanguage'
import SettingsForm from './form'

export default function AccountSettingsPage() {
    const { getItem } = useLanguage()
    const { user } = useAuth()
    const [image, setImage] = useState({ file: null, image: "" } as { file: File | null, image: string })

    const { handleSubmit, register, watch, valuesChanged, phoneChanged } = useUserForm(user)

    const saveInfo = async ({ firstName, lastName, userId, email }: unregisteredUserSchemaType) => {
        try {
            startLoading()

            const [fillnamesRes] = await Promise.all([
                functions("FillNames", {
                    firstName, lastName, userId
                }),
                email && functions("SetEmail", {
                    email
                }),
                image.file && uploadProfileImage(image.file)
            ]);

            if (!fillnamesRes.data.result)
                toast.error(getItem(fillnamesRes.data.data?.message?.slug) || getItem("Something_went_wrong_please_try_again_or_contact_us"))

            await loadUser()
        } catch (error) {
            console.log(error);

            toast.error(getItem("Something_went_wrong_please_try_again_or_contact_us"))
        } finally {
            stopLoading()
        }
    }

    const fileDataURL = (file: File) => new Promise((resolve, reject) => {
        let fr = new FileReader();
        fr.onload = () => resolve(fr.result as string);
        fr.onerror = reject;
        fr.readAsDataURL(file)
    });

    return (
        <div>
            <AccountTitle>{getItem("Account_Settings")}</AccountTitle>
            <AccountCard>
                <div className='flex items-center justify-center mb-8'>
                    <div className='relative'>
                        <UserProfile image={image.image} />
                        <label
                            className='bg-primary rounded-full p-1.5 absolute right-0 bottom-0 border-2 border-white'
                            htmlFor='profile-image'
                        >
                            <CameraIcon />
                        </label>
                        <input
                            type='file'
                            id='profile-image'
                            className='hidden'
                            onChange={async (e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    const newImage = await fileDataURL(file) as string
                                    setImage({
                                        file,
                                        image: newImage
                                    })
                                }
                            }}
                        />
                    </div>
                </div>
                <SettingsForm
                    register={register}
                    watch={watch}
                    phoneChanged={phoneChanged}
                />

            </AccountCard>
            <div className='flex mt-7 justify-end gap-4'>
                <Link to={"/"}>
                    <Button variant='secondary' className='w-[141px]'>{getItem("Cancel")}</Button>
                </Link>
                <Button
                    variant='dark'
                    className='w-[141px]'
                    disabled={valuesChanged}
                    onClick={handleSubmit(saveInfo)}
                >{getItem("Save")}</Button>
            </div>
        </div>
    )
}
