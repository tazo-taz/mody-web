import { signInWithCustomToken } from "firebase/auth"
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { getLanguageItem } from '../../../../assets/language'
import { auth, functions } from '../../../../firebase'
import { toGeoNumber } from '../../../../lib/number'
import { startLoading, stopLoading } from '../../../../references/loading'
import useModal from "../../../../stores/useModal"
import Stage1 from './stage1'
import Stage2 from './stage2'

export const codeLength = 6

export default function LoginContent({ onSignUp }: { onSignUp: () => void }) {
    const [stage, setStage] = useState(0)

    const [phone, setPhone] = useState("")
    const [code, setCode] = useState("")

    const modal = useModal()

    const onClose = () => {
        modal.onClose()
        reset()
    }

    const sendAuthSms = useCallback(() =>
        functions("requestAuthSms", {
            phoneNumber: toGeoNumber(phone)
        }), [phone])

    const goStage1 = useCallback(() => {
        setCode("")
        setStage(0)
    }, [])

    const reset = () => {
        setStage(0)
        setPhone("")
        setCode("")
    }

    const onVeriticationCodeChange = async (newCode: string) => {
        setCode(newCode)

        if (newCode.length === codeLength) {
            try {
                startLoading()
                const res = await functions("verifyAuthSmsCode", {
                    code: newCode,
                    phoneNumber: toGeoNumber(phone)
                })

                if (res.data.result) {
                    await signInWithCustomToken(auth, res.data.data.token)
                    onClose()
                }

            } catch (error) {
                console.log(error);
            } finally {
                stopLoading()
            }
        }
    }

    const sendCode = async () => {
        try {

            if (!phone)
                return toast.error(getLanguageItem("Fill_in_the_fields"))

            startLoading()
            const res = await sendAuthSms()

            if (res.data.result) {
                setStage(1)
            }
        } catch (error) {
            console.log(error);
        } finally {
            stopLoading()
        }

    }

    let content: React.ReactNode = null

    if (stage === 0) {
        content = (
            <Stage1
                phone={phone}
                setPhone={setPhone}
                sendCode={sendCode}
                onSignUp={onSignUp}
            />
        )
    }

    if (stage === 1) {
        content = (
            <Stage2
                phone={phone}
                code={code}
                onVeriticationCodeChange={onVeriticationCodeChange}
                goBack={goStage1}
                sendAuthSms={sendAuthSms}
            />
        )
    }

    return content
}
