import { Outlet } from 'react-router-dom'
import Footer from '../footer'

export default function FooterLayout() {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    )
}
