import { useState } from "react"
import { DynamicListItem } from "./DynamicList"

export interface DynamicListState<T extends DynamicListItem> {
    listItems: T[]
    _createItem: () => void
    _deleteItem: (id: number) => void
    _setItem: (index: number, replace: T) => void
}

const useDynamicList = <T extends DynamicListItem>(createNewItem: (id: number) => T): DynamicListState<T> => {
    const [listItems, setList] = useState<T[]>([createNewItem(1)])

    const _createItem = () => {
        setList(list => {
            const newId = list.reduce((prev, cur) => prev + cur.id, 1)
            return list.concat(createNewItem(newId))
        })
    }

    const _deleteItem = (id: number) => {
        setList(list => {
            if (list.length > 1)
                return list.filter(item => item.id !== id)
            
            return list
        })
    }

    const _setItem = (index: number, replace: T) => {
        setList(list => {
            const copy = [...list]
            copy[index] = {
                ...replace,
                id: copy[index].id
            }

            return copy
        })
    }

    return {
        listItems,
        _createItem,
        _deleteItem,
        _setItem
    }
}

export default useDynamicList