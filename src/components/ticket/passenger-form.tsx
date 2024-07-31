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
import Select from '../fields/select'
import { IoMaleFemale, IoFemale, IoMale } from 'react-icons/io5'
import { TicketApiEnum } from '../../lib/ticket'
import { Discount } from '../../hooks/firebase/useSearchTickets/types'
import { MdDiscount } from 'react-icons/md'

type PassengerFormType = {
    title: string,
    required?: boolean
    isChild?: boolean,
    onChange: (key: keyof passengerType, value: any) => void,
    users?: ticketUsersSchemaType,
    type: TicketApiEnum,
    discounts: Discount[] | null,
} & passengerType

export default function PassengerForm({
    title, isChild, save, required = false, gender, firstName, lastName, onChange, users = [], type, userId, discounts, discount
}: PassengerFormType) {
    const { getItem } = useLanguage()
    console.log({ discount });

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
            endTitle={getItem(!isChild ? "Adult" : "Child")}
        >
            <div className='flex flex-col gap-[15px]'>
                {users.length > 0 && (
                    <div className='flex flex-wrap gap-4 items-center'>
                        <span className='text-xs text-[#6B7280]'>
                            {getItem("Saved_Passengers")}:
                        </span>

                        {users.filter((user) => isChild ? !user.isChild : user.isChild).map((user) => (
                            <Badge
                                key={user.userId}
                                size='sm'
                                variant='secondary'
                                className='font-bold'
                                onClick={() => {
                                    onChange("firstName", user.firstName)
                                    onChange("lastName", user.lastName)
                                    // onChange("userId", user.userId)
                                }}
                            >{user.firstName}</Badge>
                        ))}
                    </div>
                )}
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
                {type === TicketApiEnum.BUS_SYSTEM && (<div className='grid grid-cols-2 gap-[15px]'>
                    <Select
                        placeholder='Gender'
                        items={[
                            { title: "Male", value: "M", icon: <IoMale /> },
                            { title: "Female", value: "F", icon: <IoFemale /> },
                        ]}
                        icon={<IoMaleFemale />}
                        className='bg-white md:bg-white'
                        value={gender}
                        onChange={value => {
                            onChange("gender", value)
                        }}
                    />
                    {discounts?.length && (
                        <Select
                            xIcon={false}
                            placeholder='Discounts'
                            items={[
                                {
                                    value: "full-ticket",
                                    title: getItem("Full_ticket"),
                                },
                                ...discounts.map((discount) => ({
                                    title: discount.discount_name,
                                    value: discount.discount_id,
                                }))]}
                            icon={<MdDiscount />}
                            className='bg-white md:bg-white'
                            value={discount}
                            onChange={value => {
                                onChange("discount", value)
                            }}

                        />
                    )}
                </div>
                )}

                {type === TicketApiEnum.GEORGIAN_BUS && (
                    <Input
                        value={userId || ""}
                        icon={<IdNumberIcon />}
                        placeholder={getItem("ID_Number")}
                        onValueChange={value => {
                            onChange("userId", value)
                        }}
                    />
                )}
                <LabeledCheckbox
                    title={getItem("Save_these_details_to_your_profile")}
                    isChecked={save}
                    onChange={value => onChange("save", value)}
                />
            </div>
        </Card>
    )
}
