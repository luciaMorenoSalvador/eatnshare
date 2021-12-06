import React, { useEffect, useState } from "react"
import Modal from "./Modal"

export interface ModalState {
    readonly hidden: boolean
    show: () => void
    hide: () => void
}

const useModal = (content: JSX.Element, destroyOnClose = true, initialState = true): [JSX.Element, ModalState] => {
    const [hidden, setHidden] = useState(initialState)
    const [loaded, setLoaded] = useState(false)

    // lazy-loading the modal
    useEffect(() => {
        if (!hidden)
            setLoaded(true)
    }, [hidden])

    const state = {
        hidden,
        show: () => setHidden(false),
        hide: () => setHidden(true)
    }

    const element = (state.hidden && destroyOnClose) || !loaded ? <></> : (
        <Modal state={state}>
            {content}
        </Modal>
    )

    return [
        element,
        state
    ]
}

export default useModal