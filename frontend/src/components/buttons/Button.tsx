import React, { ComponentProps, PropsWithoutRef } from "react"
import { ButtonProps, getButtonStyle } from "./ButtonStyle"

type DefaultButtonProps = PropsWithoutRef<ButtonProps & ComponentProps<'button'>>

const Button = React.forwardRef<HTMLButtonElement, DefaultButtonProps>((props, ref) => {
    const style = getButtonStyle(props)
    const parsedProps = {
        ...props,
        outlined: undefined,
        ref,
        className: `${style} ${props.className}`
    }

    return (
        <button {...parsedProps} />
    )
})

export default Button