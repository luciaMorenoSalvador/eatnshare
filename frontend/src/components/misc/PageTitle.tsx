import React, { PropsWithChildren } from "react"

const PageTitle = (props: PropsWithChildren<unknown>) => {
    return (
        <h1 className="text-3xl font-black mb-10 underline decoration-gray-300 decoration-wavy">
            {props.children}
        </h1>
    )
}

export default PageTitle