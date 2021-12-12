import React, { PropsWithChildren } from "react"

const Container = (props: PropsWithChildren<unknown>) => {
    return (
        <div className="py-5 px-48">
            {props.children}
        </div>
    )
}

export default Container