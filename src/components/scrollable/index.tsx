import React, { useEffect, useRef, useState } from 'react'
import { useElementSize } from 'usehooks-ts'

type ScrollableType = {
    children: React.ReactNode,
    height: number
}

export default function Scrollable({ children, height }: ScrollableType) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [squareRef, { width }] = useElementSize()
    const [elWidth, setElWidth] = useState(0)
    const elementRef = useRef<any>(null)
    const toScrollElementRef = useRef<HTMLDivElement>(null)

    const elementCoordFromRef = useRef<number | null>(null)

    useEffect(() => {
        if (width !== 0) {
            setElWidth(width)
        }
    }, [width])

    useEffect(() => {
        if (elWidth) setIsLoaded(true)
    }, [elWidth])

    useEffect(() => {
        const element = elementRef.current as HTMLDivElement
        if (element) {
            element.onmousemove = e => {
                if (elementCoordFromRef.current !== null) {
                    const toMovePx = e.clientX - elementCoordFromRef.current
                    let movedPx = toMovePx > 0 ? 0 : toMovePx

                    const maxToTranslate = toScrollElementRef.current!.offsetWidth - elementRef.current?.offsetWidth

                    if (maxToTranslate < -movedPx) {
                        if (maxToTranslate < 0 || Math.abs(maxToTranslate) === Math.abs(movedPx)) {
                            movedPx = 0
                        }
                        else {
                            movedPx = -maxToTranslate
                        }
                    }

                    toScrollElementRef.current!.style.transform = `translateX(${movedPx}px)`
                }
            }
            element.onmousedown = e => {
                const oldTransform = toScrollElementRef.current!.style.transform
                const oldTransformTranslate = !oldTransform ? 0 : +oldTransform.slice(11, -3)
                elementCoordFromRef.current = e.clientX - oldTransformTranslate
            }
            element.onmouseup = e => {
                elementCoordFromRef.current = null
            }
            element.onmouseleave = e => {
                elementCoordFromRef.current = null
            }
        }

    }, [elementRef, elWidth])



    return (
        <div ref={ref => {
            squareRef(ref)
            elementRef.current = ref
        }} className='w-full overflow-hidden select-none' style={{
            width: elWidth || "auto",
            height
        }}>
            <div ref={toScrollElementRef} style={{
                width: "max-content"
            }}>
                <div className='flex gap-4'>
                    {isLoaded && children}
                </div>
            </div>
        </div>
    )
}
