import React from 'react'
import EmailIcon from '../../assets/images/svgs/icons/email'
import UserIcon from '../../assets/images/svgs/icons/user/user'
import { objValueChange } from '../../lib/utils'
import { contactInfoType } from '../../pages/tickets/bus/search'
import useLanguage from '../../stores/useLanguage'
import Card from '../card'
import Input from '../fields/input'
import PhoneInput from '../fields/phone-input'

type TicketContactInfoProps = {
    value: contactInfoType,
    onChange: React.Dispatch<React.SetStateAction<contactInfoType>>
}

export default function TicketContactInfo({ onChange, value }: TicketContactInfoProps) {
    const { getItem } = useLanguage()
    return (
        <Card
            title={getItem("Contact_info")}
        >
            <div className='flex flex-col gap-[15px]'>
                <Input
                    icon={<UserIcon />}
                    placeholder={getItem("First_name")}
                    value={value.firstName}
                    onValueChange={objValueChange(onChange, "firstName")}
                />
                <Input
                    icon={<EmailIcon />}
                    placeholder={getItem("Email")}
                    value={value.email}
                    onValueChange={objValueChange(onChange, "email")}
                />
                <PhoneInput
                    value={value.phoneNumber}
                    onValueChange={objValueChange(onChange, "phoneNumber")}
                />
            </div>
        </Card>
    )
}
