import { zodResolver } from "@hookform/resolvers/zod"
import { signInWithCustomToken } from "firebase/auth"
import { useCallback, useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'
import { auth, functions } from '../../../../firebase'
import { toGeoNumber } from '../../../../lib/number'
import { loadUser } from "../../../../lib/user"
import { delay } from "../../../../lib/utils"
import { startLoading, stopLoading } from '../../../../references/loading'
import { unregisteredUserSchema, unregisteredUserSchemaType } from "../../../../schemas/user"
import useLanguage from "../../../../stores/useLanguage"
import useModal from "../../../../stores/useModal"
import Stage1 from './stage1'
import Stage2 from './stage2'
import useUserForm from "../../../../hooks/forms/useUserForm"

export const codeLength = 6

export default function SignUpContent({ onLogin }: { onLogin: () => void }) {
    const [stage, setStage] = useState(0)
    const { getItem } = useLanguage()

    const [code, setCode] = useState("")

    const {
        reset,
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useUserForm()

    useEffect(() => {
        const errorValues = Object.values(errors)
        errorValues.length &&
            toast.error(
                getItem("Fill_in_the_fields") +
                " (" + errorValues.map(a => a.message).filter(a => a).join(", ") + ")"
            )
    }, [errors, getItem])

    const phone = watch("phoneNumber")
    const firstName = watch("firstName")
    const lastName = watch("lastName")
    const email = watch("email")
    const userId = watch("userId")

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

    const onVeriticationCodeChange = async (newCode: string) => {
        setCode(newCode)

        if (newCode.length === codeLength) {
            try {
                startLoading()
                const res = await functions("verifyAuthSmsCode", {
                    code: newCode,
                    phoneNumber: toGeoNumber(phone),
                })

                if (res.data.result) {
                    await signInWithCustomToken(auth, res.data.data.token)
                    await delay(3000)

                    await functions("updateMyAuthInfo")

                    await functions("FillNames", {
                        firstName, lastName, userId
                    })

                    if (email) {
                        await functions("SetEmail", {
                            email
                        })
                    }
                    await loadUser()
                    onClose()
                } else toast.error(getItem("Wrong_or_expired_code"))

            } catch (error) {
                console.log(error);
            } finally {
                stopLoading()
            }
        }
    }

    const sendCode = async (data: unregisteredUserSchemaType) => {
        try {
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
                watch={watch}
                register={register}
                sendCode={handleSubmit(sendCode)}
                onLogin={onLogin}
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
