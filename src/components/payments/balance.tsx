import React from 'react'
import ReceiptIcon from '../../assets/images/svgs/icons/receipt'
import useLanguage from '../../stores/useLanguage'
import useBalance from '../../hooks/firebase/useBalance'
import { cn } from '../../lib/utils'

export default function Balance() {
  const { getItem } = useLanguage()
  const { balance, isLoading } = useBalance()
  return (
    <div className='px-5 py-4 border-1 border-primary rounded-primary balance-bg'>
      <div className={cn('flex gap-3 items-center transition', isLoading && "opacity-0")}>
        <ReceiptIcon />

        <div className='flex flex-col'>
          <span className='text-[#00000080] text-xs'>{getItem("Total_balance")}</span>
          <h3 className='text-xl font-semibold'>₾ {balance.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  )
}
