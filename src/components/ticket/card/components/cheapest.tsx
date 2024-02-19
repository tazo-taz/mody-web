import React from 'react'
import SuccessMessage from '../../../Messages/Success'
import useLanguage from '../../../../stores/useLanguage'

export default function Cheapest() {
    const { getItem } = useLanguage()
    return (
        <SuccessMessage text={getItem("CHEAPEST")} />
    )
}
