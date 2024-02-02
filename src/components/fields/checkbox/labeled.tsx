import React from 'react'
import Checkbox from '.'

type LabeledCheckboxType = {
    title: string,
    isChecked: boolean,
    onChange: (isChecked: boolean) => void
}

export default function LabeledCheckbox({ title, isChecked, onChange }: LabeledCheckboxType) {
    return (
        <div className='bg-[#7D57FD1A] py-3 px-4 flex items-center gap-2 rounded-primary'>
            <Checkbox isChecked={isChecked} onChange={onChange} />
            <h3 className='text-xs text-primary'>{title}</h3>
        </div>
    )
}
