import React from "react"

export interface ProgressBarProps {
    progress: number
}

const ProgressBar = (props: ProgressBarProps) => {
    const percentage = `${props.progress * 100}%`

    return (
        <div className="bg-gray-400 rounded-md shadow-md h-4">
            <div className="bg-green-600 shadow-xl shadow-green-600 w-0 h-full rounded-md duration-150 animate-fade-in" style={{
                width: percentage
            }} />
        </div>
    )
}

export default ProgressBar