import { IconType } from 'react-icons'
import { cn } from '../lib/utils'

type ImageIconProps = {
  Icon?: IconType,
  IconContainerClassName?: string,
  allowGradient?: boolean,
} & (
    { src: string } | { children: React.ReactNode }
  )

export default function ImageIcon({ Icon, IconContainerClassName, allowGradient = true, ...props }: ImageIconProps) {
  const checkElement = Icon && (
    <div className={cn(
      'p-2 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3',
      allowGradient && "bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600",
      IconContainerClassName
    )}>
      <Icon size={20} color='white' />
    </div>
  )
  return (
    <div>
      <div className='relative inline-block'>
        <div className='w-[90%] aspect-square bg-[#F5F5F5] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
        <div className='max-w-[149px] max-h-[144px] w-full h-full relative'>
          {"src" in props ? (
            <img src={props.src} alt='ticket' className='w-full h-full' />
          ) :
            props.children}
        </div>

        {checkElement}

        {/* left */}
        <div className='w-1.5 aspect-square bg-[#F5F5F5] absolute top-9 -left-3 rounded-full' />
        <div className='w-3 aspect-square bg-[#F5F5F5] absolute bottom-5 -left-2 rounded-full' />

        {/* right */}
        <div className='w-1.5 aspect-square bg-[#F5F5F5] absolute top-3 -right-2 rounded-full' />
        <div className='w-3 aspect-square bg-[#F5F5F5] absolute top-9 -right-1.5 rounded-full' />
      </div>
    </div>
  )
}
