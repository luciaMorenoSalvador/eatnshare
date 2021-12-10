import React, { ComponentProps } from "react"
import Icon from "../misc/Icon"

export type InputProps = {
    icon?: (props: ComponentProps<'svg'>) => JSX.Element
} & ComponentProps<'textarea'>

const TextArea = React.forwardRef<HTMLTextAreaElement, InputProps>((props, ref) => {
    const iconPadding = props.icon && 'pl-14'
    const parsedProps = {...props}
    delete parsedProps.icon

    return (
        <div>
            {props.icon &&
                <div className={`absolute py-3 px-5 border-2 border-transparent`}>
                    <Icon icon={props.icon} />
                </div>
            }
            <textarea 
                {...parsedProps}
                className={`border-gray-300 border-2 rounded-lg w-full py-3 px-5 focus:outline-none focus:ring-4 ring-gray-300 transition duration-100 shadow-sm ${iconPadding} ${props.className}`}
                ref={ref}
            />
        </div>
    )
})

export default TextArea