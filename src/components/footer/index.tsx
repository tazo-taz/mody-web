import { Link } from 'react-router-dom'
import ModyLogoWhite from '../../assets/images/svgs/logo/mody-logo-white.svg'
import FacebookIcon from '../../assets/images/svgs/socials/facebook'
import LinkedinIcon from '../../assets/images/svgs/socials/linkedin'
import TwitterIcon from '../../assets/images/svgs/socials/twitter'
import useLanguage from '../../stores/useLanguage'

export default function Footer() {
    const { getItem } = useLanguage()

    const websiteLinks = (
        <div className='text-white flex gap-3 md:gap-6'>
            <Link to="/">{getItem("Terms_and_Conditions")}</Link>
            <Link to="/">{getItem("Privacy")}</Link>
            <Link to="/">{getItem("About_Us")}</Link>
        </div>
    )

    const socialLinks = (
        <div className='ml-auto flex gap-6'>
            <a href='https://www.facebook.com/' rel="noreferrer" target='_blank'>
                <TwitterIcon />
            </a>
            <a href='https://www.facebook.com/' rel="noreferrer" target='_blank'>
                <LinkedinIcon />
            </a>
            <a href='https://www.facebook.com/' rel="noreferrer" target='_blank'>
                <FacebookIcon />
            </a>
        </div>
    )

    return (
        <div className='bg-secondary py-12'>
            <div className='container mx-auto flex flex-col gap-8'>
                <div className='flex justify-between items-center'>
                    <Link to={"/"}>
                        <img src={ModyLogoWhite} alt='' />
                    </Link>

                    <div className='md:block hidden'>
                        {websiteLinks}
                    </div>

                    <div className='md:hidden block'>
                        {socialLinks}
                    </div>
                </div>

                <div className='md:hidden block mx-auto'>
                    {websiteLinks}
                </div>

                <div className='w-full h-[1px] bg-gray-600' />

                <div className='flex justify-center md:justify-between items-center'>
                    <h2 className='text-gray-300'>{getItem("Mody_All_rights_reserved")}</h2>

                    <div className='md:block hidden'>
                        {socialLinks}
                    </div>
                </div>
            </div>
        </div>
    )
}
