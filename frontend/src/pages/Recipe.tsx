import { ChevronRightIcon, DocumentTextIcon, HeartIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartIconFull } from "@heroicons/react/solid"
import React, { useState } from "react"
import Button from "../components/buttons/Button"
import Container from "../components/misc/Container"
import Icon from "../components/misc/Icon"
import PageTitle from "../components/misc/PageTitle"
import Modal from "../components/modal/Modal"
import useModal from "../components/modal/ModalHook"
import Header from "../components/pages/Header"
import Step from "../components/pages/Step"
import StepList from "../components/pages/StepList"
import QRCode from "qrcode.react"
import TextArea from "../components/forms/TextArea"

const Recipe = () => {
    // const params = useParams()
    const [favorite, setFavorite] = useState(false)
    const videoModalState = useModal()
    const reportModalState = useModal()
    const shareModalState = useModal()

    return (
        <>
            <Header minimized />
            <Container>
                <PageTitle>
                    Paella Recipe
                    <Icon icon={favorite ? HeartIconFull : HeartIcon} className="!w-8 cursor-pointer ml-3" onClick={() => setFavorite(f => !f)} />
                </PageTitle>
                <div className="flex">
                    <div className="flex-1">
                        <StepList>
                            <Step id={1} timer={10}>
                                Boil water for X minutes
                            </Step>
                            <Step id={2}>
                                another step
                            </Step>
                            <Step id={3}>
                                the last step
                            </Step>
                        </StepList>
                    </div>
                    <div className="flex-initial">
                        <div className="flex flex-col justify-center space-y-5">
                            <div className="flex-initial w-96 h-48 bg-gray-600 rounded-lg hover:shadow-2xl duration-300 shadow-gray-600 cursor-pointer" onClick={() => videoModalState.show()}>
                                <div className="flex w-full h-full items-center justify-center">
                                    <div className="flex-initial">
                                        <Icon icon={ChevronRightIcon} className="text-gray-100 !w-20" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 w-full text-center space-x-3">
                                <Button outlined onClick={() => reportModalState.show()}>Report Recipe</Button>
                                <Button outlined onClick={() => shareModalState.show()}>Share Recipe</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Modal state={videoModalState}>
                <div className="bg-gray-600 rounded-lg" style={{ width: '800px', height: '425px' }}>
                    <div className="flex w-full h-full items-center justify-center">
                        <div className="flex-initial">
                            <p className="text-gray-100 text-4xl">Recipe Video...</p>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal state={reportModalState}>
                <div className="py-10 px-24 w-full">
                    <div className="w-96 text-left space-y-3">
                        <h1 className="text-3xl font-bold">Report this recipe</h1>
                        <TextArea placeholder="Reason" rows={5} icon={DocumentTextIcon} />
                        <Button outlined onClick={() => reportModalState.hide()}>Submit Report</Button>
                    </div>
                </div>
            </Modal>

            <Modal state={shareModalState}>
                <div className="py-10 px-24 w-full">
                    <div className="w-80 text-center">
                        <h1 className="text-3xl font-bold">Share this recipe</h1>
                        <div className="flex items-center mt-5 flex-col space-y-3">
                            <div className="text-lg">via QR Code</div>
                            <QRCode value="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
                            <div className="text-lg">or by sharing the URL of this page</div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Recipe