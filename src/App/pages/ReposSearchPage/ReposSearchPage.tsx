import React, {useEffect, useState} from "react";

import Preloader from "@components/Preloader";
import GitHubStore from '@store/GitHubStore';
import {Meta} from "@utils/meta";
import {observer} from "mobx-react-lite";

import RepoTile from "./components/RepoTile";
import Search from "./components/Search";

import './ReposSearchPage.scss';

const gitHubStore = new GitHubStore();

const ReposSearchPage: React.FC<any> = () => {

    const [currentInput, setCurrentInput] = useState<string>('ktsstudio');

    useEffect(() => {
        gitHubStore.getOrganizationReposList({
            organizationName: currentInput,
        });
    }, [currentInput]);

    return (
        <div className="repos-search-page">
            <Search setCurrentInput={setCurrentInput} isLoading={(gitHubStore.meta === Meta.loading) ? true : false}/>
            {gitHubStore.meta === Meta.loading && <Preloader/>}
            {/* eslint-disable-next-line no-console */}
            {console.log(gitHubStore.list)}
            {
                gitHubStore.list.map((it) => (
                    <RepoTile key={it.id} item={it} onClick={() => 1/* пока ничего не делает */}/>
                ))
            }
        </div>
    );
};

export default observer(ReposSearchPage);