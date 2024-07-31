import React from 'react'
import SeatStatusTitle from '.'
import { getItem } from '../../../assets/language'

export default function AvailableSeatStatus() {
  return (
    <SeatStatusTitle title={getItem('Available')} color='#31C48D' />
  )
}
