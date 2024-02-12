import { useCallback, useState } from "react"

const useOpen = (value: boolean = false) => {
    const [isOpen, setIsOpen] = useState(value)

    const open = useCallback(() => setIsOpen(true), [])

    const close = useCallback(() => setIsOpen(false), [])

    const toggle = useCallback(() => setIsOpen(a => !a), [])

    return { isOpen, open, close, toggle }
}

export default useOpen