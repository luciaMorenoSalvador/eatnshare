import React, { useContext } from "react"
import { AppContext } from "../../App"
import { Navigate } from "react-router-dom"

const ProtectedPage: React.FC = props => {
    const appContext = useContext(AppContext)

    if (!appContext.isLoggedIn) {
        return <Navigate to='/' />
    }

    // TODO: check permissions

    return (
        <>
            {props.children}
        </>
    )
}

export default ProtectedPage