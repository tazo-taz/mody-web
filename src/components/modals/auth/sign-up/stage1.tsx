import { UseFormRegister, UseFormWatch } from 'react-hook-form'
import EmailIcon from '../../../../assets/images/svgs/icons/email'
import IdNumberIcon from '../../../../assets/images/svgs/icons/id-number'
import UserIcon from '../../../../assets/images/svgs/icons/user'
import { unregisteredUserSchemaType } from '../../../../schemas/user'
import useLanguage from '../../../../stores/useLanguage'
import Button from '../../../fields/button'
import Input from '../../../fields/input'
import PhoneInput from '../../../fields/phone-input'

type Stage1Props = {
    register: UseFormRegister<unregisteredUserSchemaType>,
    watch: UseFormWatch<unregisteredUserSchemaType>,
    sendCode: () => void,
    onLogin: () => void,
}

export default function Stage1({ register, watch, sendCode, onLogin }: Stage1Props) {
    const { getItem } = useLanguage()

    return (
        <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-2 gap-4'>
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
            </div>
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
            <PhoneInput
                value={watch("phoneNumber")}
                {...register("phoneNumber")}
            />

            <Button className='mt-[60px]' onClick={sendCode}>{getItem("Next")}</Button>
            <h2 className='text-center text-gray-500 text-sm mt-3.5'>{getItem("Already_have_an_account")} <span onClick={onLogin} className='text-primary font-bold cursor-pointer'>{getItem("Log_In")}</span></h2>
        </div>
    )
}
