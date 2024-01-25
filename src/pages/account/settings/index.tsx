import React from 'react'
import useLanguage from '../../../stores/useLanguage'
import AccountTitle from '../../../components/account/title'
import AccountCard from '../../../components/account/card'
import UserWithBg from '../../../assets/images/svgs/icons/user-with-bg'
import CameraIcon from '../../../assets/images/svgs/icons/camera'
import SettingsForm from './form'
import useUserForm from '../../../hooks/forms/useUserForm'
import Button from '../../../components/fields/button'
import { Link } from 'react-router-dom'
import useUser from '../../../stores/useUser'

export default function AccountSettingsPage() {
    const { getItem } = useLanguage()
    const { user } = useUser()

    console.log(user);



    const { formState, handleSubmit, register, reset, watch } = useUserForm(user)

    console.log(formState.defaultValues);


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
                />

            </AccountCard>
            <div className='flex mt-7 justify-end gap-4'>
                <Link to={"/"}>
                    <Button variant='secondary' className='w-[141px]'>{getItem("Cancel")}</Button>
                </Link>
                <Button variant='dark' className='w-[141px]'>{getItem("Save")}</Button>
            </div>
        </div>
    )
}
