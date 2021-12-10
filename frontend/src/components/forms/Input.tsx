import React, { ComponentProps } from "react"
import Icon from "../misc/Icon"

type InputSize = 'normal' | 'large'

export type InputProps = {
    icon?: (props: ComponentProps<'svg'>) => JSX.Element
    inputSize?: InputSize
} & ComponentProps<'input'>

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const size = !props.inputSize || props.inputSize === 'normal' ? 'py-2' : 'py-3'
    const iconPadding = props.icon && 'pl-14'
    
    const parsedProps = {...props}
    delete parsedProps.inputSize
    delete parsedProps.icon

    return (
        <div>
            {props.icon &&
                <div className={`absolute ${size} px-5 border-2 border-transparent`}>
                    <Icon icon={props.icon} />
                </div>
            }
            <input 
                {...parsedProps}
                className={`border-gray-300 border-2 rounded-lg w-full ${size} px-5 focus:outline-none focus:ring-4 ring-gray-300 transition duration-100 shadow-sm ${iconPadding} ${props.className}`}
                ref={ref}
            />
        </div>
    )
})

export default Input