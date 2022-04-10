import React, {useEffect, useState} from "react";

import Preloader from "@components/Preloader";
import GitHubStore from '@store/GitHubStore';
import {Meta} from "@utils/meta";
import {action} from "mobx";
import {observer} from "mobx-react-lite";

import Owner from "./components/Owner";
import RepoTile from "./components/RepoTile";
import Search from "./components/Search";

import './ReposSearchPage.scss';

const gitHubStore = new GitHubStore();

const ReposSearchPage: React.FC<any> = () => {

    const [currentInput, setCurrentInput] = useState<string>('ktsstudio');

    useEffect(() => {
        gitHubStore.getReposOwner({
            organizationName: currentInput
        });
    }, [currentInput]);

    useEffect(action('actionGetOrganizationReposList', () => {
        if (gitHubStore.owner.userType !== '' || undefined) {
            gitHubStore.getOrganizationReposList({
                organizationName: currentInput,
                userType: gitHubStore.owner.userType,
            });
        }
    }), [gitHubStore.owner.userType, currentInput]);

    return (
        <div className="repos-search-page">
            <Search setCurrentInput={setCurrentInput} isLoading={(gitHubStore.meta === Meta.loading) ? true : false}/>
            {gitHubStore.meta === Meta.loading && <Preloader/>}
            {gitHubStore.meta === Meta.success && <Owner owner={gitHubStore.owner}/>}
            {
                gitHubStore.list.map((it) => (
                    <RepoTile key={it.id} item={it} onClick={() => 1/* пока ничего не делает */}/>
                ))
            }
        </div>
    );
};

export default observer(ReposSearchPage);