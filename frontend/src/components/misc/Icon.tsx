import React, { ComponentProps, ComponentPropsWithoutRef } from "react"

export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
    icon: (props: ComponentProps<'svg'>) => JSX.Element
}

const Icon: React.FC<IconProps> = props => {
    const parsedProps = {
        ...props,
        icon: undefined,
        className: `w-4 mr-1 -mt-1 inline ${props.className}`,
    }

    return React.createElement(props.icon, parsedProps)
}

export default Icon