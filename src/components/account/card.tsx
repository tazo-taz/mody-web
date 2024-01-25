import React from 'react'

export default function AccountCard({ children }: { children: React.ReactNode }) {
    return (
        <div className='px-6 py-8 bg-white shadow-[black_0px_0px_6px_-5px] rounded-primary border-1 border-[#E5E7EB] mt-5 flex flex-col'>{children}</div>
    )
}
