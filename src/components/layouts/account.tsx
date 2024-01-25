import React from 'react'
import { Outlet } from 'react-router-dom'
import AccountNav from '../account-nav'

export default function AccountLayout() {
    return (
        <div className='max-w-[900px] w-full mt-[50px] mx-auto'>
            <AccountNav />
            <Outlet />

        </div>
    )
}
