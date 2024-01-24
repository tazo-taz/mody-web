import React from 'react'
import { getLanguageItem } from '../../../../assets/language'
import PhoneInput from '../../../fields/phone-input'
import Button from '../../../fields/button'

type Stage1Props = {
    phone: string,
    setPhone: (newPhone: string) => void,
    sendCode: () => void,
    onSignUp: () => void,
}

export default function Stage1({ phone, setPhone, sendCode, onSignUp }: Stage1Props) {
    return (
        <>
            <h3 className='font-semibold mb-1'>{getLanguageItem("Whats_your_number")}</h3>
            <p className='text-xs text-gray-500 mb-5'>{getLanguageItem("If_you_dont_have_an_account_use_phone_registration_we_will_text_you_to_verify_your_phone_number")}</p>

            <PhoneInput value={phone} onValueChange={setPhone} />

            <Button className='mt-[60px]' onClick={sendCode}>{getLanguageItem("Next")}</Button>
            <h2 className='text-center text-gray-500 text-sm mt-3.5'>{getLanguageItem("Dont_have_an_account")} <span onClick={onSignUp} className='text-primary font-bold cursor-pointer'>{getLanguageItem("Sign_Up")}</span></h2>
        </>
    )
}
