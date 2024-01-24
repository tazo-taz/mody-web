import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import XIcon from '../../assets/images/svgs/icons/x'
import { getLanguageItem } from '../../assets/language'
import { functions } from '../../firebase'
import { hideScrollbar, showScrollbar } from '../../lib/utils'
import { startLoading, stopLoading } from '../../references/loading'
import Button from '../fields/button'

const codeLength = 6

type ModalType = {
    children: React.ReactNode,
    title: string
}

export default function Modal({ children, title }: ModalType) {
    const [stage, setStage] = useState(0)

    const [phone, setPhone] = useState("")
    const [code, setCode] = useState("")

    const onVeriticationCodeChange = async (newCode: string) => {
        setCode(newCode)
        if (newCode.length === codeLength) {
            try {

                startLoading()
                const res = await functions("verifyAuthSmsCode", {
                    code: code,
                    phoneNumber: `+995${phone}`
                })

                console.log(res);


            } catch (error) {
                console.log(error);
            } finally {
                stopLoading()
            }
        }
    }


    useEffect(() => {
        hideScrollbar()
        return showScrollbar
    }, [])

    const onNext = async () => {
        try {

            if (!phone)
                return toast.error(getLanguageItem("Fill_in_the_fields"))

            startLoading()

            const res = await functions("requestAuthSms", {
                phoneNumber: phone
            })

            if (res.data.result) {
                setStage(1)
            }
            console.log(res);
        } catch (error) {
            console.log(error, "xx");

        } finally {
            stopLoading()
        }

    }


    return (
        <>
            <div className='fixed inset-0 bg-black opacity-30 z-10' />
            <div className='fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[430px] bg-white rounded-primary'>
                <div className='flex justify-between items-center px-6 py-4 border-b-1'>
                    <h2 className='text-lg font-bold'>{title}</h2>
                    <Button size="icon" variant='secondary'>
                        <XIcon />
                    </Button>
                </div>

                <div className='p-6 flex flex-col'>
                    {children}
                </div>
            </div>
        </>
    )
}
