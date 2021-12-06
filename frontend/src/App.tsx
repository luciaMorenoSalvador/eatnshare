import React from 'react'
import Button from './components/buttons/Button';
import { LoginIcon, PlusCircleIcon, SearchIcon } from '@heroicons/react/solid'
import Icon from './components/misc/Icon';
import Modal from './components/modal/Modal'
import useModal from './components/modal/ModalHook';

function App() {
    const [modalElement, modalState] = useModal((
        <>
            <iframe width="1000" height="500" className="rounded-lg" src="https://www.youtube.com/embed/ILWSp0m9G2U" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </>    
    ), false)

    return (
        <div className="App">
            {modalElement}

            <div className="flex flex-col bg-gray-100 py-10 px-48 shadow-sm border-gray-300 border-b-2">
                <div className="flex-initial">
                    <div className="flex items-center">
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold text-gray-700">Eat & Share</h1>
                        </div>
                        <div className="flex-initial space-x-3">
                            <Button outlined><Icon icon={LoginIcon} />Login</Button>
                            <Button onClick={modalState.show}><Icon icon={PlusCircleIcon} />Create an account</Button>
                        </div>
                    </div>
                </div>
                <div className="flex-initial mt-10">
                    <div className="absolute py-3 px-5 border-2 border-transparent">
                        <Icon icon={SearchIcon} />
                    </div>
                    <input className="border-gray-300 border-2 rounded-lg w-full py-3 px-5 pl-14 focus:outline-none focus:ring-4 ring-gray-300 transition duration-100 shadow-sm" placeholder="Search something new..." />
                </div>
                <div className="flex-initial mt-3">
                    <div className="bg-white border-gray-300 border-2 rounded-lg py-3 shadow-sm">
                        <div className="flex flex-wrap">
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-700 text-center">By country</h2>
                            </div>
                            <div className="flex-initial w-1 min-h-full bg-gray-300 rounded-lg mx-5" />
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-700 text-center">By ingredients</h2>
                            </div>
                            <div className="flex-initial w-1 min-h-full bg-gray-300 rounded-lg mx-5" />
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-700 text-center">Popular chefs</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App
