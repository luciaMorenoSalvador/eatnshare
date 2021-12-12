import { useEffect, useState } from "react"

export interface Timer {
    remaining: number
    remainingText: string
    hasStarted: boolean
    hasEnded: boolean
    startTimer: () => void
    resetTimer: () => void
}

const useTimer = (seconds = 0, startImmediatly = false): Timer => {
    const [started, setStarted] = useState(startImmediatly)
    const [remaining, setRemaining] = useState(seconds)

    useEffect(() => {
        if (started) {
            setRemaining(r => r - 1)
            const interval = setInterval(() => {
                setRemaining(r => {
                    if (r > 0)
                        return r - 1
                    
                    clearInterval(interval)
                    return 0
                })
            }, 1000)
    
            return () => clearInterval(interval)
        }
    }, [started])

    return {
        remaining,
        remainingText: secondsToHMS(remaining),
        hasStarted: remaining !== seconds,
        hasEnded: remaining === 0,
        startTimer: () => {
            setStarted(true)
        },
        resetTimer: () => {
            setStarted(false)
            setRemaining(seconds)
        }
    }
}

const secondsToHMS = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    let hms = ''
    if (hours >= 1) {
        if (hours <= 9)
            hms += `0${hours}h`
        else
            hms += `${hours}h`
    }

    if (minutes >= 1) {
        if (minutes <= 9)
            hms += `0${minutes}m`
        else
            hms += `${minutes}m`
    }

    if (secs <= 9)
        hms += `0${secs}s`
    else
        hms += `${secs}s`

    return hms
}

export default useTimer