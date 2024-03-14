import React from 'react'
import Input from '../../../components/fields/input'
import UserIcon from '../../../assets/images/svgs/icons/user/user'
import useLanguage from '../../../stores/useLanguage'
import IdNumberIcon from '../../../assets/images/svgs/icons/id-number'
import EmailIcon from '../../../assets/images/svgs/icons/email'
import PhoneInput from '../../../components/fields/phone-input'
import { UseFormRegister, UseFormWatch } from 'react-hook-form'
import { unregisteredUserSchemaType } from '../../../schemas/user'
import Button from '../../../components/fields/button'
import WarningMessage from '../../../components/Messages/Warning'
import useModal from '../../../stores/useModal'

type SettingsFormType = {
    register: UseFormRegister<unregisteredUserSchemaType>,
    watch: UseFormWatch<unregisteredUserSchemaType>,
    phoneChanged: boolean
}

export default function SettingsForm({ watch, register, phoneChanged }: SettingsFormType) {
    const { getItem } = useLanguage()
    const { onOpen } = useModal()
    const phone = watch("phoneNumber")

    const updatePhoneButton = (
        <Button
            className='px-10 w-full'
            variant='outline'
            onClick={() => onOpen("update-phone", { phone: +phone })}
            disabled={!phone || !phoneChanged}
        >
            {getItem("Update")}
        </Button>
    )

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <Input
                value={watch("firstName")}
                {...register("firstName")}
                icon={<UserIcon />}
                placeholder={getItem("First_name")}
            />
            <Input
                value={watch("lastName")}
                {...register("lastName")}
                icon={<UserIcon />}
                placeholder={getItem("Last_name")}
            />
            <Input
                value={watch("userId")}
                {...register("userId")}
                icon={<IdNumberIcon />}
                type='number'
                placeholder={getItem("ID_Number")}
            />
            <Input
                value={watch("email") || ""}
                {...register("email")}
                icon={<EmailIcon />}
                placeholder={getItem("Email")}
            />
            <div className='md:col-span-2 flex items-center gap-4'>
                <div className='flex-1'>
                    <PhoneInput
                        value={watch("phoneNumber")}
                        {...register("phoneNumber")}
                    />
                </div>
                <div className='hidden md:block'>
                    {updatePhoneButton}
                </div>
            </div>
            <div className='md:col-span-2'>
                <WarningMessage
                    text={getItem("A_verification_code_will_be_sent_to_this_number")}
                    className="inline-flex md:bg-yellow-50 bg-transparent"
                />
            </div>

            <div className='block md:hidden w-full'>
                {updatePhoneButton}
            </div>

        </div>
    )
}
