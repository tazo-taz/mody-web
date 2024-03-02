import React from 'react'
import useLanguage from '../stores/useLanguage'
import AppStore from './app-store'
import GooglePlay from './google-play'
import SearchTicketsInIphone from './search-tickets-in-iphone'

export default function DownloadApp() {
  const { getItem } = useLanguage()
  return (
    <div className='bg-[#F6F5FF] mt-12 lg:mt-[126px] mb-20 lg:mb-[111px]'>
      <div className='container mx-auto'>
        <div className='pt-14 lg:pt-20 flex flex-col lg:flex-row gap-[60px]'>
          <div>
            <h1 className='text-[26px] lg:text-[48px] font-semibold'>{getItem("Download_Our_free_app")}</h1>
            <p className='text-[14px] lg:text-xl text-[#6B7280] lg:mt-6'>{getItem("One_app_for_every_step_of_your_journey_travel_planning_has_never_been_easier")}</p>

            <div className='flex gap-3 mt-8 lg:mt-12'>
              <AppStore />
              <GooglePlay />
            </div>
          </div>

          <SearchTicketsInIphone />
        </div>
      </div>
    </div>
  )
}
