import React from 'react'
import ReceiptIcon from '../../assets/images/svgs/icons/receipt'
import useLanguage from '../../stores/useLanguage'

export default function Balance() {
  const { getItem } = useLanguage()
  return (
    <div className='px-5 py-4 border-1 border-primary rounded-primary balance-bg flex gap-3 items-center'>
      <ReceiptIcon />

      <div className='flex flex-col'>
        <span className='text-[#00000080] text-xs'>{getItem("Total_balance")}</span>
        <h3 className='text-xl font-semibold'>₾ 20.55</h3>
      </div>
    </div>
  )
}
