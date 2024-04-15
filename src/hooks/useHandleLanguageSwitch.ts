import { useEffect } from 'react'
import useLanguage from '../stores/useLanguage'

export default function useHandleLanguageSwitch() {
  const { language } = useLanguage()
  useEffect(() => {
    const html = document.querySelector('html')
    if (html) {
      html.setAttribute('lang', language)
    }
  }, [language])
}
