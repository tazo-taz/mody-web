import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../../stores/useAuth'
import AccountNav from '../account/nav'
export default function AccountLayout() {
    const { user, isLoading } = useAuth()
    const location = useLocation()

    if (location.pathname.includes("/account/my-tickets/") && location.pathname.split("/account/my-tickets/")[1].length > 0)
        return (
            <div className='max-w-[900px] w-full mt-[50px] mx-auto container'>
                <Outlet />
            </div>)

    if (isLoading) return null

    if (!user) {
        return <Navigate to={'/'} />
    }
    return (
        <div className='max-w-[900px] w-full mt-[50px] mx-auto container'>
            <AccountNav />
            <Outlet />
        </div>
    )
}
