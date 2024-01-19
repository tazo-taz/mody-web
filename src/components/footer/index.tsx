import React from 'react'
import ModyLogoWhite from '../../assets/images/svgs/logo/mody-logo-white.svg'
import { Link } from 'react-router-dom'
import { getLanguageItem } from '../../assets/language'
import TwitterIcon from '../../assets/images/svgs/socials/twitter'
import LinkedinIcon from '../../assets/images/svgs/socials/linkedin'
import FacebookIcon from '../../assets/images/svgs/socials/facebook'

export default function Footer() {
    return (
        <div className='bg-secondary py-12'>
            <div className='container mx-auto flex flex-col gap-8'>
                <div className='flex justify-between items-center'>
                    <Link to={"/"}>
                        <img src={ModyLogoWhite} alt='' />
                    </Link>
                    <div className='text-white flex gap-6'>
                        <Link to="/">{getLanguageItem("Terms_and_Conditions")}</Link>
                        <Link to="/">{getLanguageItem("Privacy")}</Link>
                        <Link to="/">{getLanguageItem("About_Us")}</Link>
                    </div>
                </div>

                <div className='w-full h-[1px] bg-gray-600' />

                <div className='flex justify-between items-center'>
                    <h2 className='text-gray-300'>{getLanguageItem("Mody_All_rights_reserved")}</h2>

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
                </div>
            </div>
        </div>
    )
}
