import React from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'
import useLanguage from '../../../stores/useLanguage'

export default function Successful() {
    const { getItem } = useLanguage()
    return (
        <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#0E9F6E]">{getItem("Successful")}</span>
            <FaRegCheckCircle color="#0E9F6E" size={22} />
        </div>
    )
}
