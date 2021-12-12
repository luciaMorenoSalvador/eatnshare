import { CakeIcon, ClipboardListIcon, LinkIcon } from "@heroicons/react/solid"
import React, { ReactEventHandler, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../components/buttons/Button"
import Input from "../components/forms/Input"
import Container from "../components/misc/Container"
import DynamicList from "../components/misc/DynamicList"
import useDynamicList from "../components/misc/DynamicListHook"
import Icon from "../components/misc/Icon"
import PageTitle from "../components/misc/PageTitle"
import Modal from "../components/modal/Modal"
import useModal from "../components/modal/ModalHook"
import Header from "../components/pages/Header"
import ProtectedPage from "../components/pages/ProtectedPage"
import RecipeIngredientItem from "../components/pages/RecipeIngredientItem"
import RecipeStepItem from "../components/pages/RecipeStepItem"

interface RecipeContext {
    videoUrl?: string
}

export const RecipeContext = React.createContext<RecipeContext>({})

const CreateRecipe: React.FC = () => {
    const navigate = useNavigate()

    const ingListState = useDynamicList(id => ({ id }))
    const stepListState = useDynamicList(id => ({ id }))

    const videoModal = useModal()

    const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined)
    const onVideoInput: ReactEventHandler<HTMLInputElement> = e => {
        const input = e.target as HTMLInputElement
        const value = input.value.trim()
        if (value === '')
            setVideoUrl(undefined)
        else
            setVideoUrl(value)
    }

    const context: RecipeContext = {
        videoUrl
    }

    return (
        <ProtectedPage>
            <Header hideSearch />
            <Container>
                <PageTitle>Create a new recipe</PageTitle>
                <div className="flex items">
                    <div className="flex-1">
                        <div className="flex flex-col space-y-10">
                            <div className="flex-initial">
                                <h1 className="text-2xl font-bold text-gray-800"><Icon icon={CakeIcon} className="!w-6" /> Ingredients</h1>
                                <RecipeContext.Provider value={context}>
                                    <DynamicList
                                        className="space-y-5 mt-5"
                                        state={ingListState}
                                        getItemJSX={props => (
                                            <RecipeIngredientItem key={props.index} {...props} />
                                        )} />
                                </RecipeContext.Provider>
                            </div>
                            <div className="flex-initial">
                                <h1 className="text-2xl font-bold text-gray-800"><Icon icon={ClipboardListIcon} className="!w-6" /> Steps</h1>
                                <RecipeContext.Provider value={context}>
                                    <DynamicList
                                        className="space-y-5 mt-5"
                                        state={stepListState}
                                        getItemJSX={props => (
                                            <RecipeStepItem key={props.index} {...props} />
                                        )} />
                                </RecipeContext.Provider>
                            </div>
                        </div>
                    </div>
                    <div className="flex-initial space-y-3">
                        <Button outlined size="large" className="block">Upload Recipe Photos</Button>
                        <Button outlined size="large" className="block" onClick={() => videoModal.show()}>Add Recipe Video</Button>
                        <Button color="success" size="large" className="block" onClick={() => navigate('/')}>Create new recipe</Button>
                    </div>
                </div>
            </Container>

            <Modal state={videoModal}>
                <div className="py-10 px-24 w-full">
                    <div className="w-96 text-left space-y-5">
                        <h1 className="text-3xl font-bold">Recipe Video</h1>
                        <Input icon={LinkIcon} placeholder="https://www.youtube.com/watch?v=XXXXXXXXXXX" onInput={onVideoInput} defaultValue={videoUrl} />
                    </div>
                </div>
            </Modal>
        </ProtectedPage>
    )
}

export default CreateRecipe