import React, { useState } from 'react'
import { functions } from '../firebase'
import toast from 'react-hot-toast'
import useLanguage from '../stores/useLanguage'

type childrenParams = {
  code: string,
  setCode: React.Dispatch<React.SetStateAction<string>>,
  submit: () => void,
  disabled: boolean
}

type RedeemCodeProps = {
  children: (params: childrenParams) => React.ReactNode
}

export default function RedeemCode({ children }: RedeemCodeProps) {
  const [code, setCode] = useState("")
  const [disabled, setIsDisabled] = useState(false)
  const { getItem } = useLanguage()

  const submit = async () => {
    try {
      setIsDisabled(true)
      const res = await functions("redeemCode", { code })

      if (res.data.result) {
        toast.success(getItem("you_successfully_redeemed_code"))
      } else {
        toast.error(getItem("code-not-found-or-expired"))
      }
    } catch (error) {
      console.log(error);
      toast.error(getItem("Something_went_wrong_please_try_again_or_contact_us"))
    } finally {
      setIsDisabled(false)
    }
  }

  return (
    <>
      {children({
        code,
        setCode,
        submit,
        disabled
      })}
    </>
  )
}
