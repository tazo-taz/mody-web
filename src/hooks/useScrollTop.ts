import { useEffect } from 'react'
import { scrollToTop } from '../lib/utils'

export default function useScrollTop() {
    useEffect(() => {
        scrollToTop()
    }, [])
}
