import React from 'react'
import UserSmIcon from '../../../../assets/images/svgs/icons/user/user-sm'
import useLanguage from '../../../../stores/useLanguage'

type OneWayProps = {
    amount: number,
    isTwoWay?: any
}

export default function OneWay({ isTwoWay, amount }: OneWayProps) {
    const { getItem } = useLanguage()
    return (
        <div className='flex items-center'>
            <UserSmIcon />
            <p className='text-[#6B7280] text-xs ml-1'>{amount}, {getItem(isTwoWay ? "Two_way" : "One_way")}</p>
        </div>
    )
}
