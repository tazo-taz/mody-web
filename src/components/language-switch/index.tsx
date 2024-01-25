import React from 'react'
import Button from '../fields/button'
import EnglishFlagIcon from '../../assets/images/svgs/icons/flags/english'
import useLanguage from '../../stores/useLanguage'
import GeorgianFlagIcon from '../../assets/images/svgs/icons/flags/georgian'
import { switchLanguage } from '../../lib/language'

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage()

  let icon = <EnglishFlagIcon />
  if (language === "ge") icon = <GeorgianFlagIcon />

  const handleClick = () => switchLanguage(language, setLanguage)

  return (
    <Button size="icon" variant="secondary" onClick={handleClick}>
      {icon}
    </Button>
  )
}
