import React from 'react'
import Checkbox from '.'

type LabeledCheckboxType = {
    title: string
}

export default function LabeledCheckbox({ title }: LabeledCheckboxType) {
    return (
        <div className='bg-[#7D57FD1A] py-3 px-4 flex items-center gap-2 rounded-primary'>
            <Checkbox isChecked onChange={() => { }} />
            <h3 className='text-xs text-primary'>{title}</h3>
        </div>
    )
}
