import { StarIcon } from "@heroicons/react/outline"
import { StarIcon as StarFullIcon } from "@heroicons/react/solid"
import React, { useState } from "react"
import Icon from "../misc/Icon"
import ProgressBar from "../misc/ProgressBar"
import Rating from "./Rating"

interface StepListContext {
    addCompleted: () => void
    removeCompleted: () => void
}

export const StepListContext = React.createContext<StepListContext>({
    addCompleted: () => { return },
    removeCompleted: () => { return }
})

const StepList = (props: { children: React.ReactNode[] }) => {
    const [completed, setCompleted] = useState(0)
    const numOfSteps = props.children.length

    const ctx: StepListContext = {
        addCompleted: () => {
            setCompleted(c => {
                if (c === numOfSteps)
                    return numOfSteps
                else
                    return c + 1
            })
        },
        removeCompleted: () => {
            setCompleted(c => {
                if (c === 0)
                    return 0
                else
                    return c - 1
            })
        }
    }

    const hasCompleted = completed === numOfSteps

    return (
        <div className="space-y-5">
            <StepListContext.Provider value={ctx}>
                {props.children}
            </StepListContext.Provider>

            <div className="w-3/4 space-y-3 !mt-10">
                <ProgressBar progress={completed / numOfSteps} />

                {hasCompleted ?
                    <div>
                        <h2 className="text-xl font-bold">Congratulations! You have completed this recipe</h2>
                        <h3 className="text-lg">Please help us by rating it:</h3>
                        <div className="mt-3">
                            <Rating />
                        </div>
                    </div>
                    : <p className="mt-3">{completed} of {numOfSteps} completed</p>
                }
            </div>
        </div>
    )
}

export default StepList