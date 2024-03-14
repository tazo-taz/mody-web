import { FaCheck } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import ticketImg from "../../assets/images/tickets.png"
import useLanguage from '../../stores/useLanguage'
import useModal from '../../stores/useModal'
import Button from '../fields/button'
import ImageIcon from '../image-icon'
import Modal from '../modal'
import TicketMiniCardPurchased from '../ticket/card/simple/mini/purchased'

export default function PurchasedTicketModal() {
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
      className='p-12'
      width={540}
    >
      <div className='flex justify-center'>
        <ImageIcon allowGradient={false} src={ticketImg} Icon={FaCheck} IconContainerClassName='bg-[#0E9F6E]' />
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
