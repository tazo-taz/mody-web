import React from 'react'
import BlobSvg from '../assets/images/svgs/blob'
import { iphoneLayoutScr, searchTicketsMobileScr } from '../assets/images'

export default function SearchTicketsInIphone() {
  return (
    <div className='relative pt-[30px] overflow-hidden min-w-[294px] min-h-[360px]'>
      <div className='lg:block hidden'>
        <BlobSvg />
      </div>

      <img src={iphoneLayoutScr} alt='iphone-layout' className='w-[294px] absolute top-0 left-1/2 -translate-x-1/2' />
      <img src={searchTicketsMobileScr} alt='tickets search' className='w-[266px] absolute top-[12px] left-1/2 -translate-x-1/2 rounded-[35px]' />

      <div className='absolute w-[75px] h-[22px] bg-black rounded-[32px] top-5 left-1/2 -translate-x-1/2' />
    </div>
  )
}
