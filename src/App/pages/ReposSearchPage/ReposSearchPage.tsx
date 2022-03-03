import React, {useEffect, useState} from "react";

import {ApiResponse} from '@shared/store/ApiStore/types';
import GitHubStore from '@store/GitHubStore';
import {RepoItem} from '@store/GitHubStore/types';

import {useReposContext} from "../../App";
import RepoTile from "./components/RepoTile";
import Search from "./components/Search";
import './ReposSearchPage.scss';

const gitHubStore = new GitHubStore();

const ReposSearchPage: React.FC<any> = () => {

    const [currentInput, setCurrentInput] = useState<string>('ktsstudio');
    const [isLoading, setIsLoading] = useState(false);
    const reposContext = useReposContext();

    useEffect(() => {
        setIsLoading(true);
        gitHubStore.getOrganizationReposList({
            organizationName: currentInput
        }).then((result: ApiResponse<RepoItem[], any>) => {
            if (result.success) {
                reposContext.setReposData(result.data);
            } else {
                /* временное решение */
                // eslint-disable-next-line no-console
                console.log(result.status);
            }
        })
        setIsLoading(false);
    });

    return (
        <div className="main">
            <Search setCurrentInput={setCurrentInput} isLoading={isLoading}/>
            {
                reposContext.list.map((it) => (
                    <RepoTile key={it.id} item={it} onClick={() => 1/* пока ничего не делает */}/>
                ))}
        </div>
    );
};

export default React.memo(ReposSearchPage);