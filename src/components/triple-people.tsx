import React from 'react'
import TriplePeopleLeft from '../assets/images/svgs/triple-people/left'
import TriplePeopleRight from '../assets/images/svgs/triple-people/right'
import TriplePeopleMiddle from '../assets/images/svgs/triple-people/middle'

export default function TriplePeople() {
  return (
    <div className='relative'>
      <TriplePeopleLeft className="absolute top-[18px] left-[-27px]" />
      <TriplePeopleMiddle />
      <TriplePeopleRight className="absolute top-[23px] right-[-23px]" />
    </div>
  )
}
