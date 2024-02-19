import { useNavigate } from 'react-router-dom'
import useLanguage from '../../stores/useLanguage'
import useModal from '../../stores/useModal'
import Button from '../fields/button'
import Modal from '../modal'
import TicketMiniCardPurchased from '../ticket/card/simple/mini/purchased'
import TicketImage from '../ticket/image'

export default function PurchasedTicket() {
  const { getItem } = useLanguage()
  const { data, onClose } = useModal()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/account/my-tickets/${data?.ticket?.uid}`)
    onClose()
  }

  return (
    <Modal
      modalType={"purchased-ticket"}
      childrenClassName='p-12'
      width={540}
    >
      <div className='flex justify-center'>
        <TicketImage type='success' />
      </div>

      <h2 className='text-lg font-semibold whitespace-pre text-center mt-5 mb-8'>{getItem("You_have_successfully_purchased_tickets")}</h2>

      {data?.ticket && (
        <TicketMiniCardPurchased {...data.ticket} />
      )}

      <Button
        className='mt-10'
        onClick={handleClick}
      >{getItem("My_tickets")}</Button>
    </Modal>
  )
}
