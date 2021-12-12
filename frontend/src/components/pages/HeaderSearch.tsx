import { SearchIcon } from "@heroicons/react/solid"
import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../../App"
import Button from "../buttons/Button"
import Checkbox from "../forms/Checkbox"
import Input from "../forms/Input"
import { SearchContext } from "./Header"

const HeaderSearch: React.FC = () => {
    const navigate = useNavigate()
    const appContext = useContext(AppContext)
    const searchContext = useContext(SearchContext)

    return (
        <>
            <div className="flex-initial mt-10">
                <div className="flex items-center space-x-5">
                    <div className="flex-1">
                        <Input placeholder="Search something new..." icon={SearchIcon} inputSize="large" />
                    </div>
                    {appContext.isLoggedIn &&
                        <>
                            <div className="flex-initial">
                                or
                            </div>
                            <div className="flex-initial">
                                <Button color="success" size="large" onClick={() => navigate('/recipe/new')}>Create a new recipe</Button>
                            </div>
                        </>
                    }
                </div>
            </div>
            {!searchContext.minimized &&
                <div className="flex-initial mt-3">
                    <div className="bg-white border-gray-300 border-2 rounded-lg py-3 shadow-sm">
                        <div className="flex flex-wrap">
                            {!searchContext.country &&
                                <>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-gray-700 text-center">Popular countries</h2>
                                        <ul className="px-20 my-5 text-lg">
                                            <li><Link to="/">Recipes from Portugal</Link></li>
                                            <li><Link to="/" onClick={() => searchContext.setCountry()}>Recipes from Spain</Link></li>
                                            <li><Link to="/">Recipes from Germany</Link></li>
                                            <li><Link to="/">Recipes from Italy</Link></li>
                                            <li><Link to="/">Recipes from France</Link></li>
                                        </ul>
                                    </div>
                                    <div className="flex-initial w-1 min-h-full bg-gray-300 rounded-lg mx-5" />
                                </>
                            }

                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-700 text-center">Popular ingredients</h2>
                                <ul className="px-20 my-5 text-lg space-y-3">
                                    {searchContext.country ? 
                                        <li><Checkbox className="mr-3 -mb-1" onClick={() => searchContext.setIngredient()} /> Rice</li> 
                                        : <li><Checkbox className="mr-3 -mb-1" /> Potatoes</li>
                                    }
                                    <li><Checkbox className="mr-3 -mb-1" /> Bacon</li>
                                    <li><Checkbox className="mr-3 -mb-1" /> Cheese</li>
                                </ul>
                            </div>
                            <div className="flex-initial w-1 min-h-full bg-gray-300 rounded-lg mx-5" />
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-700 text-center">Popular chefs</h2>
                                <ul className="px-20 my-5 text-lg">
                                    <li><Link to="/">Chef 1</Link></li>
                                    <li><Link to="/">Chef 2</Link></li>
                                    <li><Link to="/">Chef 3</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default HeaderSearch