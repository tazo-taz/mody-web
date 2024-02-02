import React from 'react'
import Card from '../card'
import useLanguage from '../../stores/useLanguage'
import Input from '../fields/input'
import UserIcon from '../../assets/images/svgs/icons/user/user'
import EmailIcon from '../../assets/images/svgs/icons/email'
import PhoneInput from '../fields/phone-input'

export default function TicketContactInfo() {
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
                />
                <Input
                    icon={<EmailIcon />}
                    placeholder={getItem("Email")}
                />
                <PhoneInput />
            </div>
        </Card>
    )
}
