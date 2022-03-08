import React from 'react';

import NotFound from "@components/NotFound";
import Preloader from "@components/Preloader";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

import './App.scss';

import ReposPage from "./pages/ReposPage";
import ReposSearchPage from "./pages/ReposSearchPage";


function App() {
    return (
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/repos" element={<ReposSearchPage />}/>
                        <Route path="/repos/:id" element={<ReposPage />}/>
                        <Route path="/loading" element={<Preloader />}/>
                        <Route path="/error/404" element={<NotFound />}/>

                        <Route path="*" element={<Navigate to="/repos"/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
    );
};

export default App;
