import { useState } from "react"

const useOpen = (value: boolean = false) => {
    const [isOpen, setIsOpen] = useState(value)

    const open = () => setIsOpen(true)

    const close = () => setIsOpen(false)

    const toggle = () => setIsOpen(a => !a)

    return { isOpen, open, close, toggle }
}

export default useOpen