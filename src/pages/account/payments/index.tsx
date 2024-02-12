import React from 'react'
import AccountTitle from '../../../components/account/title'
import useLanguage from '../../../stores/useLanguage'
import AccountCard from '../../../components/account/card'
import Balance from '../../../components/payments/balance'
import CardsForm from '../../../components/payments/cards-form'

export default function PaymentsPage() {
    const { getItem } = useLanguage()

    return (
        <>
            <AccountTitle>
                {getItem("Payment_methods")}
            </AccountTitle>

            <AccountCard>
                <Balance />
                <CardsForm className='mt-6' />
            </AccountCard>
        </>
    )
}
