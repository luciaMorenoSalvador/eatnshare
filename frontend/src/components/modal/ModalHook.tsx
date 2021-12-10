import { useState } from "react"
import { ModalState } from "./Modal"

const useModal = (destroyOnClose = true, initialState = true): ModalState => {
    const [hidden, setHidden] = useState(initialState)

    const state = {
        hidden,
        destroyOnClose,
        show: () => setHidden(false),
        hide: () => setHidden(true)
    }

    return state
}

export default useModal