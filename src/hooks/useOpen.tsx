import { useState } from "react"

const useOpen = (value: boolean = false) => {
    const [isOpen, setIsOpen] = useState(value)

    const open = () => setIsOpen(true)

    const close = () => setIsOpen(false)

    return { isOpen, open, close }
}

export default useOpen