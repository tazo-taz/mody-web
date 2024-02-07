import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../stores/useAuth'
import AccountNav from '../account/nav'
export default function AccountLayout() {
    const { user, isLoading } = useAuth()

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
