import React from 'react'
import SeatStatusTitle from '.'
import useLanguage from '../../../stores/useLanguage'

export default function ReservedSeatStatus() {
  const { getItem } = useLanguage()
  return (
    <SeatStatusTitle title={getItem('Reserved')} color='#F3F4F6' />
  )
}
