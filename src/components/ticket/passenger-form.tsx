import React from 'react'
import Input from '../fields/input'
import UserIcon from '../../assets/images/svgs/icons/user/user'
import useLanguage from '../../stores/useLanguage'
import IdNumberIcon from '../../assets/images/svgs/icons/id-number'
import { cn } from '../../lib/utils'
import LabeledCheckbox from '../fields/checkbox/labeled'
import { passengerType } from '../../pages/tickets/bus/search'

type PassengerFormType = {
    title: string,
    required?: boolean
    isAdult?: boolean,
    onChange: (key: keyof passengerType, value: string) => void
} & passengerType

export default function PassengerForm({ title, isAdult, required = false, firstName, lastName, userId, onChange }: PassengerFormType) {
    const { getItem } = useLanguage()
    return (
        <div className='bg-white border-1 rounded-primary'>
            <div className='p-[25px] flex items-center justify-between border-b-1'>
                <div className='font-semibold'>
                    {title}
                    <span className={cn("ml-1 text-sm", required ? "text-rose-600" : "text-[#6B7280] font-normal")}>
                        ({getItem(required ? "Required" : "Optional")})
                    </span>
                </div>
                <div className='text-xs text-[#6B7280]'>{getItem(isAdult ? "Adult" : "Child")}</div>
            </div>

            <div className='flex flex-col gap-[15px] p-[25px]'>
                <Input
                    value={firstName}
                    icon={<UserIcon />}
                    placeholder={getItem("First_name")}
                    onValueChange={value => {
                        onChange("firstName", value)
                    }}
                />
                <Input
                    value={lastName}
                    icon={<UserIcon />}
                    placeholder={getItem("Last_name")}
                    onValueChange={value => {
                        onChange("lastName", value)
                    }}
                />
                <Input
                    value={userId}
                    icon={<IdNumberIcon />}
                    placeholder={getItem("ID_Number")}
                    onValueChange={value => {
                        onChange("userId", value)
                    }}
                />
                <LabeledCheckbox title={getItem("Save_these_details_to_your_profile")} />
            </div>
        </div >
    )
}
