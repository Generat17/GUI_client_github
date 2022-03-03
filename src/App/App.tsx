import React, {createContext, useContext, useState} from 'react';

import {RepoItem} from "@store/GitHubStore/types";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

import './App.scss';

import ReposPage from "./pages/ReposPage";
import ReposSearchPage from "./pages/ReposSearchPage";

type ReposContextType = {
    list: RepoItem[];
    setReposData:  React.Dispatch<React.SetStateAction<RepoItem[]>>;
}

const ReposContext = createContext<ReposContextType>({
    list: [],
    setReposData: () => {}
});

const Provider = ReposContext.Provider;

export const useReposContext = () => useContext(ReposContext);

function App() {
    const [list, setReposData] = useState<RepoItem[]>([]);

    return (
        <Provider value={{
            list, setReposData
        }}>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<ReposSearchPage/>}/>
                        <Route path="/repos" element={<ReposSearchPage/>}/>
                        <Route path="/repos/:id" element={<ReposPage/>}/>

                        <Route path="*" element={<Navigate to="/repos"/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>
    );
};

export default App;
