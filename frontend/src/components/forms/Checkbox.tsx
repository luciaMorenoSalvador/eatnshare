import React, { ComponentProps } from "react";

const Checkbox = React.forwardRef<HTMLInputElement, ComponentProps<'input'>>((props, ref) => {
    return (
        <input
            type="checkbox"
            {...props}
            ref={ref}
            className={`appearance-none cursor-pointer rounded-xl bg-gray-400 shadow-md shadow-gray-300 w-5 h-5 checked:bg-green-500 checked:ring-2 checked:ring-green-500 ring-offset-2 ${props.className}`}
        />
    )
})

export default Checkbox