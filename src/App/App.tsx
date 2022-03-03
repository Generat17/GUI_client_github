import React, {createContext, useContext, useState} from 'react';

import NotFound from "@components/NotFound";
import Preloader from "@components/Preloader";
import {RepoItemModel} from "@store/models/gitHub";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

import './App.scss';

import ReposPage from "./pages/ReposPage";
import ReposSearchPage from "./pages/ReposSearchPage";

type ReposContextType = {
    list: RepoItemModel[];
    setReposData:  React.Dispatch<React.SetStateAction<RepoItemModel[]>>;
}

const ReposContext = createContext<ReposContextType>({
    list: [],
    setReposData: () => {}
});

const Provider = ReposContext.Provider;

export const useReposContext = () => useContext(ReposContext);

function App() {
    const [list, setReposData] = useState<RepoItemModel[]>([]);

    return (
        <Provider value={{
            list, setReposData
        }}>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<ReposSearchPage />}/>
                        <Route path="/repos" element={<ReposSearchPage />}/>
                        <Route path="/repos/:id" element={<ReposPage />}/>
                        <Route path="/loading" element={<Preloader />}/>
                        <Route path="/error/404" element={<NotFound />}/>

                        <Route path="*" element={<Navigate to="/repos"/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>
    );
};

export default App;
