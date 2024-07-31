import React from 'react'
import ChevronRight from '../assets/images/svgs/icons/chevron/chevron-right'
import { cn } from '../lib/utils'

type BreadcrumbsType<T> = {
    className?: string,
    data: ({ id: T, title: string } | false | null)[],
    choose: (id: T) => void,
    active: T
}

export default function Breadcrumbs<T>({ className, choose, data, active }: BreadcrumbsType<T>) {
    const isActive = (id: T) => id === active

    return (
        <div className={cn(
            'flex items-center gap-5',
            className
        )}>
            {data.map((item, inx) => {
                if (!item) return null
                return (
                    <React.Fragment key={item.title}>
                        <div
                            onClick={() => choose(item.id)}
                            className={cn(
                                "cursor-pointer active:scale-95 transition",
                                isActive(item.id) ? "font-bold" : "text-[#4B5563] hover:text-primary"
                            )}
                        >{item.title}</div>
                        {inx !== data.length - 1 && (
                            <ChevronRight color='#111928' />
                        )}
                    </React.Fragment>
                )
            })}
        </div>
    )
}
