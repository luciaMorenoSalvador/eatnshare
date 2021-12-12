import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateRecipe from "./pages/CreateRecipe";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";

export interface AppContext {
    isLoggedIn: boolean
    setLoggedIn: (loggedIn: boolean) => void
}

export const AppContext = React.createContext<AppContext>({
    isLoggedIn: false,
    setLoggedIn: () => { return }
})

const App: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState(false)

    const context: AppContext = {
        isLoggedIn: loggedIn,
        setLoggedIn: (loggedIn) => setLoggedIn(loggedIn)
    }

    return (
        <AppContext.Provider value={context}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/recipe/new" element={<CreateRecipe />} />
                    <Route path="/recipe/paella" element={<Recipe />} />
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App
