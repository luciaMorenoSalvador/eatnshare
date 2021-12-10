import { AtSymbolIcon, KeyIcon, LoginIcon, PlusCircleIcon, UserIcon } from "@heroicons/react/solid";
import React, { useContext } from "react";
import { AppContext } from "../../App";
import Button from "../buttons/Button";
import Input from "../forms/Input";
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
}

export const SearchContext = React.createContext<SearchContext>({
    minimized: false
})

export const Header: React.FC<HeaderProps> = props => {
    const appContext = useContext(AppContext)

    const loginModalState = useModal()
    const registerModalState = useModal()

    const searchContext: SearchContext = {
        minimized: props.minimized || false
    }

    return (
        <div>
            <div className="flex flex-col bg-gray-100 py-5 px-48 shadow-lg shadow-gray-100 border-b-2">
                <div className="flex-initial">
                    <div className="flex items-center">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-700">Eat & Share</h1>
                        </div>
                        <div className="flex-initial space-x-3">
                            {appContext.isLoggedIn ?
                                <>
                                    <h1 className="inline">Hello User</h1>
                                    <Button outlined>Profile</Button>
                                    <Button color="danger">Logout</Button>
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
            </div>

            {!appContext.isLoggedIn &&
                <>
                    <Modal state={loginModalState}>
                        <div className="py-10 px-24 w-full">
                            <div className="w-80 text-center">
                                <h1 className="text-3xl font-bold">Login</h1>
                                <form className="mt-10 space-y-3">
                                    <Input type="email" placeholder="Email" icon={AtSymbolIcon} />
                                    <Input type="password" placeholder="Password" icon={KeyIcon} />
                                    <Button type="submit"><Icon icon={LoginIcon} />Login</Button>
                                </form>
                                <Button outlined className="mt-10">Login with Google</Button>
                            </div>
                        </div>
                    </Modal>

                    <Modal state={registerModalState}>
                        <div className="py-10 px-24 w-full">
                            <div className="w-80 text-center">
                                <h1 className="text-3xl font-bold">Create an account</h1>
                                <form className="mt-10 space-y-3">
                                    <Input type="text" placeholder="Name" icon={UserIcon} />
                                    <Input type="email" placeholder="Email" icon={AtSymbolIcon} />
                                    <Input type="password" placeholder="Password" icon={KeyIcon} />
                                    <Button type="submit"><Icon icon={PlusCircleIcon} />Create your account</Button>
                                </form>
                                <Button outlined className="mt-10">Login with Google</Button>
                            </div>
                        </div>
                    </Modal>
                </>
            }
        </div>
    )
}

export default Header