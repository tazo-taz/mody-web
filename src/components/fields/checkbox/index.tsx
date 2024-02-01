import { IoMdCheckmark, IoMdClose } from "react-icons/io";

type CheckboxType = {
    isChecked: boolean,
    onChange: (e: boolean) => void
}

export default function Checkbox({ isChecked, onChange }: CheckboxType) {
    const Icon = isChecked ? IoMdCheckmark : IoMdClose

    return (
        <div
            className='w-5 h-5 bg-primary rounded-[4px] flex items-center justify-center cursor-pointer'
            onClick={() => onChange(!isChecked)}
        >
            <Icon className='w-4 h-4 text-white' />
        </div>
    )
}
