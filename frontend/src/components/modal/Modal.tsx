import React, { MouseEventHandler, useEffect, useRef, useState } from "react"

type KeyboardListener = (this: Document, event: KeyboardEvent) => unknown

export interface ModalState {
    readonly hidden: boolean
    readonly destroyOnClose: boolean
    show: () => void
    hide: () => void
}

export interface ModalProps {
    state: ModalState
}

const Modal: React.FC<ModalProps> = props => {
    const backRef = useRef<HTMLDivElement>(null)
    const onMouseDown: MouseEventHandler<HTMLDivElement> = e => {
        if (e.target === backRef.current)
            props.state.hide()
    }

    useEffect(() => {
        const keyEvent: KeyboardListener = e => {
            if (e.key === 'Escape')
                props.state.hide()
        }

        const options: AddEventListenerOptions = { once: true }
        document.addEventListener('keydown', keyEvent, options)
        return () => document.removeEventListener('keydown', keyEvent, options)
    })

    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        if (!props.state.hidden)
            setLoaded(true)
    }, [props])

    if (!loaded || (props.state.hidden && props.state.destroyOnClose))
        return <></>

    return (
        <div className="absolute !m-0 !top-0 !left-0 min-w-full min-h-screen bg-black bg-opacity-50 animate-fade-in" hidden={props.state.hidden} onClick={onMouseDown}>
            <div className="flex min-w-full min-h-screen justify-center items-center" ref={backRef}>
                <div className="flex-grow-0 bg-gray-100 shadow-sm rounded-lg animate-fade-in-up">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Modal