import Calendar from 'react-calendar'
import useModal from '../../stores/useModal'
import Modal from '../modal'

export default function CalendarModal() {
  const { data } = useModal()

  return (
    <Modal
      modalType={"calendar"}
      childrenClassName='p-5'
      width={540}
    >
      <div className='h-[5px] w-16 bg-gray-200 rounded-md absolute top-3 left-1/2 -translate-x-1/2' />
      {data?.calendar && (
        <Calendar onChange={data.calendar.ownOnChange} value={data.calendar.value} />
      )}
    </Modal>
  )
}
