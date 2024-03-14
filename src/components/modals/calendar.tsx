import Calendar from 'react-calendar'
import useModal from '../../stores/useModal'
import Modal from '../modal'

export default function CalendarModal() {
  const { data } = useModal()

  return (
    <Modal
      modalType={"calendar"}
      className='p-5 items-center justify-center'
      width={"100%"}
    >
      <div className='h-[5px] w-16 bg-gray-200 rounded-md absolute top-3 left-1/2 -translate-x-1/2' />
      {data?.calendar && (
        <Calendar minDate={new Date()} onChange={data.calendar.ownOnChange} value={data.calendar.value} />
      )}
    </Modal>
  )
}
