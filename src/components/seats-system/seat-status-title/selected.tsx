import React from 'react'
import SeatStatusTitle from '.'
import { getItem } from '../../../assets/language'

export default function SelectedSeatStatus() {
  return (
    <SeatStatusTitle title={getItem('Selected')} color='#F98080' />
  )
}
