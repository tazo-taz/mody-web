import useLanguage from '../../../../stores/useLanguage'
import Button from '../../../fields/button'
import PhoneInput from '../../../fields/phone-input'

type Stage1Props = {
    phone: string,
    setPhone: (newPhone: string) => void,
    sendCode: () => void,
    onSignUp: () => void,
}

export default function Stage1({ phone, setPhone, sendCode, onSignUp }: Stage1Props) {
    const { getItem } = useLanguage()

    return (
        <>
            <h3 className='font-semibold mb-1'>{getItem("Whats_your_number")}</h3>
            <p className='text-xs text-gray-500 mb-5'>{getItem("If_you_dont_have_an_account_use_phone_registration_we_will_text_you_to_verify_your_phone_number")}</p>

            <PhoneInput value={phone} onValueChange={setPhone} />

            <Button className='mt-[60px]' onClick={sendCode}>{getItem("Next")}</Button>
            <h2 className='text-center text-gray-500 text-sm mt-3.5'>{getItem("Dont_have_an_account")} <span onClick={onSignUp} className='text-primary font-bold cursor-pointer'>{getItem("Sign_Up")}</span></h2>
        </>
    )
}
