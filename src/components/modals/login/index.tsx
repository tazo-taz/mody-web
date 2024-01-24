import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { getLanguageItem } from '../../../assets/language'
import { auth, functions } from '../../../firebase'
import { startLoading, stopLoading } from '../../../references/loading'
import Modal from '../../modal'
import Stage1 from './stage1'
import Stage2 from './stage2'
import { toGeoNumber } from '../../../lib/number'
import { signInWithCustomToken } from "firebase/auth";

export const codeLength = 6

export default function LoginModal() {
    const [stage, setStage] = useState(0)

    const [phone, setPhone] = useState("")
    const [code, setCode] = useState("")

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
                }

            } catch (error) {
                console.log(error);
            } finally {
                stopLoading()
            }
        }
    }

    const sendAuthSms = useCallback(() =>
        functions("requestAuthSms", {
            phoneNumber: toGeoNumber(phone)
        }), [phone])

    const sendCode = async () => {
        try {

            if (!phone)
                return toast.error(getLanguageItem("Fill_in_the_fields"))

            startLoading()

            const res = await sendAuthSms()

            console.log(res.data);


            if (res.data.result) {
                setStage(1)
            }
        } catch (error) {
            console.log(error);
        } finally {
            stopLoading()
        }

    }

    const goStage1 = useCallback(() => {
        setCode("")
        setStage(0)
    }, [])

    let content: React.ReactNode = null

    if (stage === 0) {
        content = (
            <Stage1
                phone={phone}
                setPhone={setPhone}
                sendCode={sendCode}
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

    return (
        <Modal
            children={content}
            title={getLanguageItem("Log_In")}
        />
    )
}
