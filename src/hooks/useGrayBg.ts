import { useEffect } from 'react'

export default function useGrayBg() {
    useEffect(() => {
        document.body.style.backgroundColor = "#F9FAFB"
        return () => {
            document.body.style.backgroundColor = "white"
        }
    }, [])
}
