import React, { useMemo } from "react"
import { DynamicListState } from "./DynamicListHook"

export type DynamicListItem = {
    id: number
}

export interface DynamicListInfo {
    items: number
    createItem: () => void
    deleteItem: (id: number) => void
}

export interface DynamicListProps<T extends DynamicListItem> {
    state: DynamicListState<T>
    getItemJSX: (props: DynamicListItemProps<T>) => JSX.Element
    className?: string
}

export interface DynamicListItemProps<T extends DynamicListItem> {
    item: T
    setItem: (item: T) => void
    index: number
    info: DynamicListInfo
}

const DynamicList = <T extends DynamicListItem>(props: DynamicListProps<T>) => {
    const dynamicList = useMemo(() => {
        return props.state.listItems.map((item, index) => props.getItemJSX({
            item,
            setItem: item => props.state._setItem(index, item),
            index, 
            info: {
                items: props.state.listItems.length,
                createItem: props.state._createItem,
                deleteItem: props.state._deleteItem
            }
        }))
    }, [props])

    return (
        <div className={props.className}>
            {dynamicList}
        </div>
    )
}

export default DynamicList