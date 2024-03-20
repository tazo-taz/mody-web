import React from 'react'
import Input from '../fields/input'
import UserIcon from '../../assets/images/svgs/icons/user/user'
import useLanguage from '../../stores/useLanguage'
import IdNumberIcon from '../../assets/images/svgs/icons/id-number'
import { cn } from '../../lib/utils'
import LabeledCheckbox from '../fields/checkbox/labeled'
import { passengerType } from '../../pages/tickets/bus/search'
import Card from '../card'
import { ticketUsersSchemaType } from '../../schemas/ticket/user'
import Badge from '../badge'

type PassengerFormType = {
    title: string,
    required?: boolean
    isAdult?: boolean,
    onChange: (key: keyof passengerType, value: any) => void,
    users?: ticketUsersSchemaType
} & passengerType

export default function PassengerForm({ title, isAdult, save, required = false, firstName, lastName, userId, onChange, users = [] }: PassengerFormType) {
    const { getItem } = useLanguage()
    return (
        <Card
            title={(
                <>
                    <div className='font-semibold'>
                        {title}
                        <span className={cn("ml-1 text-sm", required ? "text-rose-600" : "text-[#6B7280] font-normal")}>
                            ({getItem(required ? "Required" : "Optional")})
                        </span>
                    </div>
                </>)
            }
            endTitle={getItem(isAdult ? "Adult" : "Child")}
        >
            <div className='flex flex-col gap-[15px]'>
                <div className='flex flex-wrap gap-4 items-center'>
                    <span className='text-xs text-[#6B7280]'>
                        {getItem("Saved_Passengers")}:
                    </span>

                    {users.filter((user) => isAdult ? !user.isChild : user.isChild).map((user) => (
                        <Badge
                            key={user.userId}
                            size='sm'
                            variant='secondary'
                            className='font-bold'
                            onClick={() => {
                                onChange("firstName", user.firstName)
                                onChange("lastName", user.lastName)
                                onChange("userId", user.userId)
                            }}
                        >{user.firstName}</Badge>
                    ))}
                </div>
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
                    value={userId || ""}
                    icon={<IdNumberIcon />}
                    placeholder={getItem("ID_Number")}
                    onValueChange={value => {
                        onChange("userId", value)
                    }}
                />
                <LabeledCheckbox
                    title={getItem("Save_these_details_to_your_profile")}
                    isChecked={save}
                    onChange={value => onChange("save", value)}
                />
            </div>
        </Card>
    )
}
