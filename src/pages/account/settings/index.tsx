import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import CameraIcon from '../../../assets/images/svgs/icons/camera'
import UserWithBg from '../../../assets/images/svgs/icons/user-with-bg'
import AccountCard from '../../../components/account/card'
import AccountTitle from '../../../components/account/title'
import Button from '../../../components/fields/button'
import { functions } from '../../../firebase'
import useUserForm from '../../../hooks/forms/useUserForm'
import { loadUser } from '../../../lib/user'
import { startLoading, stopLoading } from '../../../references/loading'
import { unregisteredUserSchemaType } from '../../../schemas/user'
import useAuth from '../../../stores/useAuth'
import useLanguage from '../../../stores/useLanguage'
import SettingsForm from './form'

export default function AccountSettingsPage() {
    const { getItem } = useLanguage()
    const { user } = useAuth()

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
                })
            ]);

            if (!fillnamesRes.data.result)
                toast.error(getItem(fillnamesRes.data?.message?.slug) || getItem("Something_went_wrong_please_try_again_or_contact_us"))

            await loadUser()
        } catch (error) {
            console.log(error);

            toast.error(getItem("Something_went_wrong_please_try_again_or_contact_us"))
        } finally {
            stopLoading()
        }
    }

    return (
        <div>
            <AccountTitle>{getItem("Account_Settings")}</AccountTitle>
            <AccountCard>
                <div className='flex items-center justify-center mb-8'>
                    <div className='relative'>
                        <UserWithBg />
                        <div className='bg-primary rounded-full p-1.5 absolute right-0 bottom-0 border-2 border-white'>
                            <CameraIcon />
                        </div>
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
