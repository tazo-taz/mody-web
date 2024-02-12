import React, { useEffect } from 'react'
import Card from '../card'
import useLanguage from '../../stores/useLanguage'
import useMyCards from '../../hooks/firebase/useMyCards'
import Radio from '../fields/radio'
import { CiCreditCard2 } from "react-icons/ci";
import { typePaymentType } from '../../pages/tickets/bus/search'

type PaymentMethodProps = {
    value: typePaymentType,
    onChange: (value: PaymentMethodProps["value"]) => void
}

export default function PaymentMethod({ value, onChange }: PaymentMethodProps) {
    const { getItem } = useLanguage()
    const { cards, isLoading } = useMyCards()

    useEffect(() => {
        if (!isLoading) {
            if (cards.length) onChange(0)
            else onChange("new")
        }
    }, [
        isLoading, cards, onChange
    ])

    return (
        <Card title={getItem("Payment_methods")}>
            <Radio
                value={value}
                onChange={onChange}
                items={[
                    { value: "new", icon: <CiCreditCard2 className='w-6 h-6' />, title: getItem("Pay_with_new_card") }
                ]}
            />
        </Card>
    )
}
