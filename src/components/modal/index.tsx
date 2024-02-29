import { useEffect } from 'react'
import { hideScrollbar, showScrollbar } from '../../lib/utils'
import useModal, { modalStore } from '../../stores/useModal'
import StaticModal from './static'

type ModalType = {
    children: React.ReactNode,
    title?: string,
    modalType: modalStore["modalType"],
    onClose?: () => void,
    className?: string,
    width?: number | string
}

export default function Modal({ children, title, modalType, onClose: onCloseCb, className, width = 430 }: ModalType) {
    const modal = useModal()

    useEffect(() => {
        if (modal.modalType === modalType) {
            hideScrollbar()
            return showScrollbar
        }
    }, [modalType, modal.modalType])

    const onClose = () => {
        modal.onClose()
        onCloseCb?.()
    }

    return <StaticModal
        children={children}
        isOpen={modal.modalType === modalType}
        onClose={onClose}
        className={className}
        title={title}
        width={width}
    />
}
