import React from 'react'
import AccountTitle from '../../../components/account/title'
import useLanguage from '../../../stores/useLanguage'
import AccountCard from '../../../components/account/card'
import ImageIcon from '../../../components/image-icon'
import RedeemCodeSvg from '../../../assets/images/svgs/redeem'
import { FaExchangeAlt } from "react-icons/fa";
import Input from '../../../components/fields/input'
import Button from '../../../components/fields/button'
import WarningMessage from '../../../components/Messages/Warning'
import styles from "./style.module.css"
import RedeemIcon from '../../../assets/images/svgs/icons/redeem'
import { cn } from '../../../lib/utils'
import RedeemCode from '../../../components/redeem-code'

export default function RedeemCodesPage() {
    const { getItem } = useLanguage()

    return (
        <>
            <AccountTitle>
                {getItem("Redeem_codes")}
            </AccountTitle>

            <AccountCard>
                <div className='flex flex-col justify-center items-center mt-20'>
                    <ImageIcon IconContainerClassName='bottom-1' Icon={FaExchangeAlt}>
                        <RedeemCodeSvg />
                    </ImageIcon>

                    <h2 className='mt-6 font-semibold'>{getItem("Just_enter_your_Redeem_code_below")}</h2>
                    <div className={styles["form-grid"]}>
                        <RedeemCode>
                            {({ code, setCode, submit, disabled }) => (
                                <>
                                    <Input
                                        icon={<RedeemIcon />}
                                        placeholder={getItem("Code")}
                                        value={code}
                                        onValueChange={setCode}
                                        containerClassName={styles['form-input']}
                                        disabled={disabled}
                                    />
                                    <Button
                                        variant='outline'
                                        className={cn('px-12', styles['form-button'])}
                                        onClick={submit}
                                        disabled={disabled}
                                    >
                                        {getItem("Apply")}
                                    </Button>
                                </>
                            )}
                        </RedeemCode>
                        <div className={styles['form-warning']}>
                            <WarningMessage size='sm' text={getItem("Make_sure_that_upper_and_lower_case_characters_are_correct")} />
                        </div>
                    </div>
                </div>
            </AccountCard>
        </>
    )
}
