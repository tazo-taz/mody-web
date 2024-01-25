import moment from 'moment'
import { useEffect, useRef } from 'react'
import { codeLength } from '.'
import { useTimer } from '../../../../hooks/useTimer'
import useLanguage from '../../../../stores/useLanguage'
import Button from '../../../fields/button'
import VerificationInput from '../../../fields/verification-input'

type Stage2Props = {
    phone: string,
    code: string,
    onVeriticationCodeChange: (newCode: string) => void,
    goBack: () => void,
    sendAuthSms: () => Promise<any>,
}

export default function Stage2({ phone, code, onVeriticationCodeChange, goBack, sendAuthSms }: Stage2Props) {
    const { seconds, resume, reset } = useTimer(30)
    const inputRef = useRef(null)
    const { getItem } = useLanguage()

    useEffect(() => {
        resume()
    }, [resume])

    const resend = async () => {
        if (seconds === 0) {
            await sendAuthSms()
            reset()
            resume()
        }
    }


    return (
        <>
            <p className='text-gray-500 text-sm mb-5'>{getItem("Enter_the_6_digit_code_sent_to_you_at")} <span className='text-secondary font-semibold'>{phone}</span></p>

            <VerificationInput inputRef={inputRef} value={code} setValue={onVeriticationCodeChange} count={codeLength} />

            <div className='mt-5'>
                <Button style={seconds ? {
                    color: "#b1b1b1"
                } : {}} disabled={!!seconds} onClick={resend} size='sm' className='rounded-full font-medium' variant='secondary'>{getItem("Resend_code")} ({moment.utc(seconds * 1000).format('mm:ss')})</Button>
            </div>

            <div className='grid grid-cols-2 mt-[86px] gap-5'>
                <Button onClick={goBack} className='text-black' variant='secondary'>{getItem("Go_Back")}</Button>
                <Button>{getItem("Log_In")}</Button>
            </div>
        </>
    )
}
