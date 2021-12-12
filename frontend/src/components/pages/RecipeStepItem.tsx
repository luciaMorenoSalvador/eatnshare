import { ClockIcon, LinkIcon, MinusIcon, PlusIcon } from "@heroicons/react/solid"
import React, { ReactEventHandler, useContext } from "react"
import { RecipeContext } from "../../pages/CreateRecipe"
import Button from "../buttons/Button"
import Input from "../forms/Input"
import TextArea from "../forms/TextArea"
import { DynamicListItemProps } from "../misc/DynamicList"
import Icon from "../misc/Icon"
import Modal from "../modal/Modal"
import useModal from "../modal/ModalHook"

export type RecipeStepItemProps = DynamicListItemProps<{
    id: number
    step?: string
    tool?: string
}>

const RecipeStepItem: React.FC<RecipeStepItemProps> = props => {
    const optionsModalState = useModal()
    const recipeContext = useContext(RecipeContext)

    const onInput: ReactEventHandler<HTMLTextAreaElement> = e => {
        const input = e.target as HTMLTextAreaElement
        props.setItem({
            ...props.item,
            step: input.value
        })
    }

    const onToolLinkInput: ReactEventHandler<HTMLInputElement> = e => {
        const input = e.target as HTMLInputElement
        props.setItem({
            ...props.item,
            tool: input.value
        })
    }

    return (
        <div key={props.item.id}>
            <div className="flex space-x-3 items-start">
                <div className="flex-initial w-10 mt-2"><h2 className="text-lg">#{props.index + 1}</h2></div>
                <div className="flex-initial w-1/2">
                    <TextArea rows={2} placeholder={`Step ${props.index + 1}`} onInput={onInput} defaultValue={props.item.step} />
                    <div className="mt-3 space-x-3">
                        <Button onClick={() => optionsModalState.show()}>Options</Button>
                    </div>
                </div>

                {props.index === props.info.items - 1 && <Button onClick={() => props.info.createItem()}><Icon icon={PlusIcon} /></Button>}
                {props.info.items > 1 && <Button onClick={() => props.info.deleteItem(props.item.id)}><Icon icon={MinusIcon} /></Button>}
            </div>

            <Modal state={optionsModalState}>
                <div className="py-10 px-24 w-full">
                    <div className="w-96 text-left space-y-5">
                        <div className="space-y-3">
                            <h1 className="text-3xl font-bold">Tool Link</h1>
                            <Input icon={LinkIcon} placeholder="https://link.to.tool" onInput={onToolLinkInput} defaultValue={props.item.tool} />
                        </div>
                        <div className="space-y-3">
                            <h1 className="text-3xl font-bold">Timer</h1>
                            <div className="flex items-center">
                                <div className="flex-initial">
                                    <Input icon={ClockIcon} type="number" min={0} max={72} placeholder="00" />
                                </div>
                                <div className="flex-initial ml-3 mr-5">h</div>
                                <div className="flex-initial">
                                    <Input icon={ClockIcon} type="number" min={0} max={59} placeholder="00" />
                                </div>
                                <div className="flex-initial ml-3">m</div>
                            </div>
                        </div>
                        {recipeContext.videoUrl &&
                            <div className="space-y-3">
                                <h1 className="text-3xl font-bold">Video Marker</h1>
                                <div className="flex items-center">
                                    <div className="flex-initial">
                                        <Input icon={ClockIcon} type="number" min={0} max={72} placeholder="00" />
                                    </div>
                                    <div className="flex-initial ml-3 mr-5">h</div>
                                    <div className="flex-initial">
                                        <Input icon={ClockIcon} type="number" min={0} max={59} placeholder="00" />
                                    </div>
                                    <div className="flex-initial ml-3">m</div>
                                </div>
                            </div>
                        }
                        {/* <div className="space-y-3">
                            <h1 className="text-3xl font-bold">Associate Photos</h1>
                        </div> */}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default RecipeStepItem