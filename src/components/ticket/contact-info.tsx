import React from 'react'
import Card from '../card'
import useLanguage from '../../stores/useLanguage'
import Input from '../fields/input'
import UserIcon from '../../assets/images/svgs/icons/user/user'
import EmailIcon from '../../assets/images/svgs/icons/email'
import PhoneInput from '../fields/phone-input'
import { contactInfoType } from '../../pages/tickets/bus/search'
import { objChange, objValueChange } from '../../lib/utils'

type TicketContactInfoProps = {
    value: contactInfoType,
    onChange: React.Dispatch<React.SetStateAction<contactInfoType>>
}

export default function TicketContactInfo({ onChange, value }: TicketContactInfoProps) {
    const { getItem } = useLanguage()
    return (
        <Card
            title={getItem("Contact_info")}
            secondaryTitle={getItem("Where_do_you_want_get_tickets")}
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
