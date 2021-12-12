import React, { PropsWithChildren, useContext, useEffect, useRef } from "react"
import { ReactEventHandler } from "react"
import { useState } from "react"
import Button from "../buttons/Button"
import Checkbox from "../forms/Checkbox"
import useTimer from "../misc/TimerHook"
import { StepListContext } from "./StepList"

export interface StepProps {
    id: number
    timer?: number
}

const Step = (props: PropsWithChildren<StepProps>) => {
    const [completed, setCompleted] = useState(false)

    const checkboxRef = useRef<HTMLInputElement>(null)
    const hasTimer = props.timer !== undefined
    const stepTimer = useTimer(props.timer)
    const listContext = useContext(StepListContext)

    useEffect(() => {
        if (checkboxRef.current && hasTimer) {
            setCompleted(stepTimer.hasEnded)
            checkboxRef.current.checked = stepTimer.hasEnded
        }
    }, [hasTimer, stepTimer.hasEnded])

    useEffect(() => {
        if (completed)
            listContext.addCompleted()
        else
            listContext.removeCompleted()
    }, [completed])

    const onCheckboxChange: ReactEventHandler<HTMLInputElement> = e => {
        const input = e.target as HTMLInputElement
        setCompleted(input.checked)
    }

    return (
        <div className="flex space-x-5">
            <div className="flex-initial w-8">
                <p className="text-xl">#{props.id}</p>
            </div>
            <div className="flex-initial mt-1">
                <Checkbox
                    ref={checkboxRef}
                    onChange={onCheckboxChange} />
            </div>
            <div className="flex-1 space-y-3">
                <p className="text-xl">{props.children}{hasTimer && ` (${stepTimer.remainingText})`}</p>
                {hasTimer && (
                    <>
                        {stepTimer.hasEnded ?
                            <Button outlined onClick={() => stepTimer.resetTimer()}>Reset Timer</Button>
                            : <Button outlined onClick={() => stepTimer.startTimer()} disabled={stepTimer.hasStarted}>Start Timer</Button>
                        }
                    </>
                )}
            </div>
        </div>
    )
}

export default Step