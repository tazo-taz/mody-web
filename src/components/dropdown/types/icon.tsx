import React from 'react'
import Dropdown, { dropdownItemType, separatorType } from '..'

type IconDropdownType = {
  icon: React.ReactNode,
  title: string,
  items: (dropdownItemType | separatorType | false)[]
}


export default function IconDropdown({ icon, title, items }: IconDropdownType) {
  return (
    <Dropdown items={items}>
      <div className='bg-white rounded-primary flex items-center justify-center w-10 h-10'>
        {icon}
      </div>
      <h5>{title}</h5>
    </Dropdown>
  )
}
