import { AtSymbolIcon, KeyIcon, LoginIcon, PlusCircleIcon, UserIcon } from "@heroicons/react/solid";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
import Button from "../buttons/Button";
import Input from "../forms/Input";
import Container from "../misc/Container";
import Icon from "../misc/Icon";
import Modal from "../modal/Modal";
import useModal from "../modal/ModalHook";
import HeaderSearch from "./HeaderSearch";

export interface HeaderProps {
    hideSearch?: boolean
    minimized?: boolean
}

export interface SearchContext {
    minimized: boolean
    country?: boolean
    setCountry: () => void
    ingredient?: boolean
    setIngredient: () => void
}

export const SearchContext = React.createContext<SearchContext>({
    minimized: false,
    setCountry: () => { return },
    setIngredient: () => { return }
})

export const Header: React.FC<HeaderProps> = props => {
    const appContext = useContext(AppContext)

    const loginModalState = useModal()
    const registerModalState = useModal()

    // LMAO
    const [country, setCountry] = useState(false)
    const [ingredient, setIngredient] = useState(false)

    const searchContext: SearchContext = {
        minimized: props.minimized || false,
        country,
        ingredient,
        setCountry: () => setCountry(true),
        setIngredient: () => setIngredient(true)
    }

    return (
        <div>
            <div className="flex flex-col bg-gray-100 shadow-lg shadow-gray-100 border-b-2">
                <Container>
                    <div className="flex-initial">
                        <div className="flex items-center">
                            <div className="flex-1">
                                <Link to="/" className="text-3xl font-bold text-gray-700">Eat & Share</Link>
                            </div>
                            <div className="flex-initial space-x-3">
                                {appContext.isLoggedIn ?
                                    <>
                                        <h1 className="inline">Hello User</h1>
                                        <Button outlined>Profile</Button>
                                        <Button color="danger" onClick={() => appContext.setLoggedIn(false)}>Logout</Button>
                                    </>
                                    :
                                    <>
                                        <Button outlined onClick={loginModalState.show}><Icon icon={LoginIcon} />Login</Button>
                                        <Button onClick={registerModalState.show}><Icon icon={PlusCircleIcon} />Create an account</Button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>

                    {!props.hideSearch &&
                        <SearchContext.Provider value={searchContext}>
                            <HeaderSearch />
                        </SearchContext.Provider>
                    }
                </Container>
            </div>

            {!props.hideSearch && country &&
                <SearchContext.Provider value={searchContext}>
                    <Container>
                        <div className="flex mb-10">
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold">Showing recipes from Spain{ingredient && ` with Rice`}</h1>
                            </div>
                        </div>
                        {ingredient &&
                            <Link to="/recipe/paella" className="flex flex-col w-96 h-80 group cursor-pointer">
                                <div className="flex-1 bg-gray-400 h-full rounded-lg group-hover:shadow-xl shadow-gray-400 duration-300"></div>
                                <div className="flex-1 mt-5">
                                    <h2 className="text-2xl font-bold">Paella Recipe</h2>
                                </div>
                            </Link>
                        }
                    </Container>
                </SearchContext.Provider>
            }

            {!appContext.isLoggedIn &&
                <>
                    <Modal state={loginModalState}>
                        <div className="py-10 px-24 w-full">
                            <div className="w-80 text-center">
                                <h1 className="text-3xl font-bold">Login</h1>
                                <div className="mt-10 space-y-3">
                                    <Input type="email" placeholder="Email" icon={AtSymbolIcon} />
                                    <Input type="password" placeholder="Password" icon={KeyIcon} />
                                    <Button><Icon icon={LoginIcon} onClick={() => {
                                        loginModalState.hide()
                                        appContext.setLoggedIn(true)
                                    }} />Login</Button>
                                </div>
                                <Button outlined className="mt-10" onClick={() => {
                                    loginModalState.hide()
                                    appContext.setLoggedIn(true)
                                }}>Login with Google</Button>
                            </div>
                        </div>
                    </Modal>

                    <Modal state={registerModalState}>
                        <div className="py-10 px-24 w-full">
                            <div className="w-80 text-center">
                                <h1 className="text-3xl font-bold">Create an account</h1>
                                <div className="mt-10 space-y-3">
                                    <Input type="text" placeholder="Name" icon={UserIcon} />
                                    <Input type="email" placeholder="Email" icon={AtSymbolIcon} />
                                    <Input type="password" placeholder="Password" icon={KeyIcon} />
                                    <Button><Icon icon={PlusCircleIcon} onClick={() => {
                                        registerModalState.hide()
                                        appContext.setLoggedIn(true)
                                    }} />Create your account</Button>
                                </div>
                                <Button outlined className="mt-10" onClick={() => {
                                    registerModalState.hide()
                                    appContext.setLoggedIn(true)
                                }}>Login with Google</Button>
                            </div>
                        </div>
                    </Modal>
                </>
            }
        </div>
    )
}

export default Header