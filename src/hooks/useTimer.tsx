import { useCallback, useEffect, useRef, useState } from "react"

export const useTimer = (second: number) => {
    const [time, setTime] = useState(second)

    const interval = useRef<any>()

    const stop = useCallback(() => clearInterval(interval.current), [])

    const resume = useCallback(() => {
        stop()
        interval.current = setInterval(() => {
            setTime(time => {
                return time - 1
            })
        }, 1000)
    }, [stop])

    const reset = useCallback(() => {
        setTime(second)
    }, [second])


    useEffect(() => {
        if (time <= 0) stop()
    }, [time, stop])

    useEffect(() => {
        setTime(second)
    }, [second])

    useEffect(() => {
        return stop
    }, [stop])

    return { seconds: time, resume, reset, stop }
}
