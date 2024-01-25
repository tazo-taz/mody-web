import { Navigate, Outlet } from 'react-router-dom'
import useUser from '../../stores/useUser'
import AccountNav from '../account/nav'
export default function AccountLayout() {
    const { user, isLoading } = useUser()

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
