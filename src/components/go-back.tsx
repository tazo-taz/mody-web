import React from 'react'
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

type GoBackProps = {
    children: React.ReactNode,
    url?: string
}

export default function GoBack({ children, url }: GoBackProps) {
    const navigate = useNavigate();

    const goBack = () => {
        if (typeof url === "undefined") navigate(-1)
        else navigate(url)
    }
    return (
        <div onClick={goBack} className='flex gap-4 items-center cursor-pointer'>
            <div className='w-12 h-12 rounded-full bg-white border-1 flex items-center justify-center'>
                <FiArrowLeft color='#6B7280' size={20} />
            </div>

            <h2 className='text-lg font-medium'>
                {children}
            </h2>
        </div>
    )
}
