import React from 'react'
import Card from '../card'
import useLanguage from '../../stores/useLanguage'

export default function PaymentMethod() {
    const { getItem } = useLanguage()
    return (
        <Card title={getItem("Payment_methods")}>PaymentMethod</Card>
    )
}
