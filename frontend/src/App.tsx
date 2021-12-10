import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateRecipe from "./pages/CreateRecipe";
import Home from "./pages/Home";

export interface AppContext {
    isLoggedIn: boolean
}

export const AppContext = React.createContext<AppContext>({
    isLoggedIn: false
})

const App: React.FC = () => {
    const context: AppContext = {
        isLoggedIn: true
    }

    return (
        <AppContext.Provider value={context}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/recipe/new" element={<CreateRecipe />} />
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App
