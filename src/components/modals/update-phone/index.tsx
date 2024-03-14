import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { functions } from "../../../firebase"
import { toGeoNumber } from "../../../lib/number"
import { loadUser } from "../../../lib/user"
import { startLoading, stopLoading } from "../../../references/loading"
import useLanguage from "../../../stores/useLanguage"
import useModal from "../../../stores/useModal"
import Modal from "../../modal"
import UpdatePhoneComponent from "./component"

export const codeLength = 6

export default function UpdatePhone() {
    const { getItem } = useLanguage()


    const [code, setCode] = useState("")

    const modal = useModal()
    const phone = modal?.data?.phone

    const onClose = () => {
        modal.onClose()
    }

    const sendAuthSms = useCallback(() =>
        phone && functions("requestAuthSms", {
            phoneNumber: toGeoNumber(String(phone))
        }), [phone])

    const sendCode = useCallback(async () => {
        try {

            if (!phone)
                return toast.error(getItem("Fill_in_the_fields"))

            startLoading()
            await sendAuthSms()


        } catch (error) {
            console.log(error);
        } finally {
            stopLoading()
        }

    }, [getItem, phone, sendAuthSms])

    useEffect(() => {
        if (modal.modalType === "update-phone") {
            sendCode()
        }
    }, [modal.modalType, sendCode])

    const onVeriticationCodeChange = async (newCode: string) => {
        if (!phone) return
        setCode(newCode)

        if (newCode.length === codeLength) {
            try {
                startLoading()
                const res = await functions("verifyAuthSmsCode", {
                    code: newCode,
                    phoneNumber: toGeoNumber(String(phone))
                })

                if (res.data.result) {
                    await loadUser()
                    onClose()
                } else {
                    toast.error(getItem(res?.data?.slug) || getItem("Something_went_wrong_please_try_again_or_contact_us"))
                }

            } catch (error) {
                console.log(error);
            } finally {
                stopLoading()
            }
        }
    }

    return (
        <Modal
            title={getItem("Edit_Phone")}
            modalType={"update-phone"}
        >
            <UpdatePhoneComponent
                phone={String(phone)}
                code={code}
                onVeriticationCodeChange={onVeriticationCodeChange}
                sendAuthSms={sendAuthSms}
            />
        </Modal>
    )
}
