import React from 'react'
import Card from '../card'
import useLanguage from '../../stores/useLanguage'
import Input from '../fields/input'
import Button from '../fields/button'
import RedeemIcon from '../../assets/images/svgs/icons/redeem'
import WarningMessage from '../Messages/Warning'

export default function UseaDiscount() {
    const { getItem } = useLanguage()
    return (
        <Card title={getItem("Use_a_Discount")}>
            <div className='flex gap-4 w-full items-center'>
                <div className='flex-1'>
                    <Input
                        icon={<RedeemIcon />}
                        placeholder={getItem("Code")}
                        value="#redeemCode"
                    />
                </div>
                <Button
                    variant='outline'
                    className='px-12'
                >{getItem("Apply")}</Button>
            </div>
            <WarningMessage text={getItem("Make_sure_that_upper_and_lower_case_characters_are_correct")} className='mt-4 py-3 px-4' />
        </Card>
    )
}
