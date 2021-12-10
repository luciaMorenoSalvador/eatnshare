import { CakeIcon, ClipboardListIcon, LinkIcon } from "@heroicons/react/solid"
import React from "react"
import { useNavigate } from "react-router-dom"
import Button from "../components/buttons/Button"
import Input from "../components/forms/Input"
import DynamicList from "../components/misc/DynamicList"
import useDynamicList from "../components/misc/DynamicListHook"
import Icon from "../components/misc/Icon"
import Modal from "../components/modal/Modal"
import useModal from "../components/modal/ModalHook"
import Header from "../components/pages/Header"
import ProtectedPage from "../components/pages/ProtectedPage"
import RecipeIngredientItem from "../components/pages/RecipeIngredientItem"
import RecipeStepItem from "../components/pages/RecipeStepItem"

const CreateRecipe: React.FC = () => {
    const navigate = useNavigate()

    const ingListState = useDynamicList(id => ({ id }))
    const stepListState = useDynamicList(id => ({ id }))

    const videoModal = useModal()

    return (
        <ProtectedPage>
            <Header hideSearch />
            <div className="py-10 px-48">
                <h1 className="text-3xl font-black mb-10 underline decoration-gray-300 decoration-wavy">Create a new recipe</h1>
                <div className="flex items">
                    <div className="flex-1">
                        <div className="flex flex-col space-y-10">
                            <div className="flex-initial">
                                <h1 className="text-2xl font-bold text-gray-800"><Icon icon={CakeIcon} className="!w-6" /> Ingredients</h1>
                                <DynamicList
                                    className="space-y-5 mt-5"
                                    state={ingListState}
                                    getItemJSX={props => (
                                        <RecipeIngredientItem key={props.index} {...props} />
                                    )} />
                            </div>
                            <div className="flex-initial">
                                <h1 className="text-2xl font-bold text-gray-800"><Icon icon={ClipboardListIcon} className="!w-6" /> Steps</h1>
                                <DynamicList
                                    className="space-y-5 mt-5"
                                    state={stepListState}
                                    getItemJSX={props => (
                                        <RecipeStepItem key={props.index} {...props} />
                                    )} />
                            </div>
                        </div>
                    </div>
                    <div className="flex-initial space-y-3">
                        <Button outlined size="large" className="block">Upload Recipe Photos</Button>
                        <Button outlined size="large" className="block" onClick={() => videoModal.show()}>Add Recipe Video</Button>
                        <Button color="success" size="large" className="block" onClick={() => navigate('/')}>Create new recipe</Button>
                    </div>
                </div>
            </div>

            <Modal state={videoModal}>
                <div className="py-10 px-24 w-full">
                    <div className="w-96 text-left space-y-5">
                        <h1 className="text-3xl font-bold">Recipe Video</h1>
                        <Input icon={LinkIcon} placeholder="https://www.youtube.com/watch?v=XXXXXXXXXXX" />
                    </div>
                </div>
            </Modal>
        </ProtectedPage>
    )
}

export default CreateRecipe