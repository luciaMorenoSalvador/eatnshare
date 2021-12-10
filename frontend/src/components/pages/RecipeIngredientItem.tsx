import { MinusIcon, PlusIcon } from "@heroicons/react/solid"
import React, { ReactEventHandler } from "react"
import Button from "../buttons/Button"
import Input from "../forms/Input"
import { DynamicListItemProps } from "../misc/DynamicList"
import Icon from "../misc/Icon"

export type RecipeStepItemProps = DynamicListItemProps<{
    id: number
    ingredient?: string
    quantity?: string
}>

const RecipeIngredientItem: React.FC<RecipeStepItemProps> = props => {
    const onIngredientInput: ReactEventHandler<HTMLInputElement> = e => {
        const input = e.target as HTMLInputElement
        props.setItem({
            ...props.item,
            ingredient: input.value
        })
    }

    const onQuantityInput: ReactEventHandler<HTMLInputElement> = e => {
        const input = e.target as HTMLInputElement
        props.setItem({
            ...props.item,
            quantity: input.value
        })
    }

    return (
        <div key={props.item.id} className="flex space-x-3 items-start">
            <div className="flex-initial w-10 mt-2"><h2 className="text-lg">#{props.index + 1}</h2></div>
            <div className="flex-initial w-1/2">
                <Input placeholder={`Ingredient ${props.index + 1}`} onInput={onIngredientInput} defaultValue={props.item.ingredient} />
            </div>
            <div className="flex-initial w-28">
                <Input placeholder="Quantity" onInput={onQuantityInput} defaultValue={props.item.quantity} />
            </div>

            {props.index === props.info.items - 1 && <Button onClick={() => props.info.createItem()}><Icon icon={PlusIcon} /></Button>}
            {props.info.items > 1 && <Button onClick={() => props.info.deleteItem(props.item.id)}><Icon icon={MinusIcon} /></Button>}
        </div>
    )
}

export default RecipeIngredientItem