import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/utils'

export type TabType = {
  nav: ({
    title: string
  } & (
      {
        href: string
      } | {
        onClick: () => void
      }
    ))[],
  activeIndex?: number,
  className?: string
}

export default function Tab({ nav, activeIndex: activeIndexProps, className }: TabType) {
  const location = useLocation()
  const _activeIndex = nav.findIndex((item) => {
    if ("href" in item) return item.href === location.pathname || item.href + "/" === location.pathname
    return false
  })
  const activeIndex = activeIndexProps ?? (_activeIndex === -1 ? 0 : _activeIndex)

  const navItemClassname = "py-1 text-center text-[#6B7280] rounded-md relative z-[1] whitespace-nowrap text-sm"
  const activeNavItemClassname = "text-secondary font-semibold"

  return (
    <div className={cn('bg-[#F3F4F6] border-1 border-[#E5E7EB] rounded-lg p-1 hidden md:block', className)}>
      <div className='relative grid' style={{
        gridTemplateColumns: `repeat(${nav.length}, 1fr)`
      }}>
        <div
          className="absolute top-0 bottom-0 transition-[left] bg-white shadow-md rounded-md"
          style={{
            left: activeIndex * 100 / nav.length + "%",
            width: 100 / nav.length + "%",
          }}
        />
        {nav.map((item, inx) => "href" in item ? (
          <Link
            to={item.href}
            key={inx}
            className={cn(navItemClassname, activeIndex === inx && activeNavItemClassname)}
          >{item.title}</Link>
        ) : (
          <button
            onClick={item.onClick}
            key={inx}
            className={cn(navItemClassname, activeIndex === inx && activeNavItemClassname)}
          >{item.title}</button>
        ))}
      </div>
    </div>
  )
}
