import { UseFormRegister, UseFormWatch } from 'react-hook-form'
import EmailIcon from '../../../../assets/images/svgs/icons/email'
import IdNumberIcon from '../../../../assets/images/svgs/icons/id-number'
import UserIcon from '../../../../assets/images/svgs/icons/user'
import { getLanguageItem } from '../../../../assets/language'
import Button from '../../../fields/button'
import Input from '../../../fields/input'
import PhoneInput from '../../../fields/phone-input'
import { unregisteredUserSchemaType } from '../../../../schemas/user'

type Stage1Props = {
    register: UseFormRegister<unregisteredUserSchemaType>,
    watch: UseFormWatch<unregisteredUserSchemaType>,
    sendCode: () => void,
    onLogin: () => void,
}

export default function Stage1({ register, watch, sendCode, onLogin }: Stage1Props) {
    return (
        <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-2 gap-4'>
                <Input
                    value={watch("firstName")}
                    {...register("firstName")}
                    icon={<UserIcon />}
                    placeholder={getLanguageItem("First_name")}
                />
                <Input
                    value={watch("lastName")}
                    {...register("lastName")}
                    icon={<UserIcon />}
                    placeholder={getLanguageItem("Last_name")}
                />
            </div>
            <Input
                value={watch("userId")}
                {...register("userId")}
                icon={<IdNumberIcon />}
                type='number'
                placeholder={getLanguageItem("ID_Number")}
            />
            <Input
                value={watch("email") || ""}
                {...register("email")}
                icon={<EmailIcon />}
                placeholder={getLanguageItem("Email")}
            />
            <PhoneInput
                value={watch("phoneNumber")}
                {...register("phoneNumber")}
            />

            <Button className='mt-[60px]' onClick={sendCode}>{getLanguageItem("Next")}</Button>
            <h2 className='text-center text-gray-500 text-sm mt-3.5'>{getLanguageItem("Already_have_an_account")} <span onClick={onLogin} className='text-primary font-bold cursor-pointer'>{getLanguageItem("Log_In")}</span></h2>
        </div>
    )
}
