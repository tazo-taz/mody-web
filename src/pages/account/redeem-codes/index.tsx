import React from 'react'
import AccountTitle from '../../../components/account/title'
import useLanguage from '../../../stores/useLanguage'
import AccountCard from '../../../components/account/card'
import ImageIcon from '../../../components/image-icon'
import RedeemCodeSvg from '../../../assets/images/svgs/redeem'
import { FaExchangeAlt } from "react-icons/fa";

export default function RedeemCodesPage() {
    const { getItem } = useLanguage()

    return (
        <>
            <AccountTitle>
                {getItem("Redeem_codes")}
            </AccountTitle>

            <AccountCard>
                <div className='flex justify-center mt-20'>
                    <ImageIcon IconContainerClassName='bottom-1' Icon={FaExchangeAlt}>
                        <RedeemCodeSvg />
                    </ImageIcon>
                </div>
            </AccountCard>
        </>
    )
}
