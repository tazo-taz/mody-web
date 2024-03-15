import React, { useEffect, useState } from 'react'
import Button from './fields/button'
import useLanguage from '../stores/useLanguage'
import useAuth from '../stores/useAuth'
import { doc, getDoc } from 'firebase/firestore'
import { db, functions } from '../firebase'
import { PiCopySimple } from "react-icons/pi";
import toast from 'react-hot-toast'
import { languageData } from '../assets/language'
import { generateInviteFriendText } from '../lib/utils'
import { startLoading, stopLoading } from '../references/loading'

export default function InviteFriend() {
  const { getItem } = useLanguage()
  const [code, setCode] = useState<string | undefined | null>(undefined)
  const { user } = useAuth()

  useEffect(() => {
    const load = async () => {
      try {
        const uid = user?.uid
        if (uid) {
          const referralDoc = await getDoc(doc(db, 'referrals', uid));
          if (referralDoc.exists()) {
            const codes = referralDoc.data().codes;
            if (codes && codes.length > 0) {
              setCode(codes[0]);
            } else {
              setCode(null);
            }
          }
        }
      } catch (error) {
        console.error('Error loading referral data:', error);
      }
    };
    load();
  }, [user?.uid])

  const copy = (txt: string) => {
    var tempInput = document.createElement("input");
    tempInput.value = txt;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }

  const handleCopy = (txt: string, message: keyof typeof languageData) => {
    copy(txt)
    toast.success(getItem(message))
  }

  const createNewCode = async () => {
    try {
      startLoading();

      const result = await functions("createReferralCode");
      if (result.data.result) {
        if (result.data?.data?.code) {
          setCode(result.data?.data?.code);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(getItem("Something_went_wrong_please_try_again_or_contact_us"))
    } finally {
      stopLoading()
    }
  };

  if (code) {
    return (
      <>
        <Button
          variant='secondary-outline'
          className='mt-8 mb-4 text-primary text-xs'
          onClick={() => handleCopy(code, "Code_successfully_copied")}
        >
          <PiCopySimple size={20} className='mr-1.5' />
          {code}
        </Button>
        <Button onClick={() => handleCopy(generateInviteFriendText(code), "Send_copied_text_to_your_friend")}>{getItem("Invite")}</Button>
      </>
    )
  }

  return (
    <>
      <Button
        variant='secondary-outline'
        className='mt-8 mb-4 text-primary text-xs'
        onClick={() => code === null && createNewCode()}
      >
        {getItem("Click_to_get_the_invite_code")}
      </Button>
      <Button disabled>{getItem("Invite")}</Button>
    </>
  )
}
