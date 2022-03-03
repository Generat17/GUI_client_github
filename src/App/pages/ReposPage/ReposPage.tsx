import './ReposPage.scss';

import {useEffect, useState} from "react";

import {ApiResponse} from "@shared/store/ApiStore/types";
import GitHubStore from '@store/GitHubStore';
import {RepositoryDetail} from "@store/GitHubStore/types";
import {useParams} from "react-router-dom";

const gitHubStore = new GitHubStore();

const ReposPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [reposDetail, setRepoDetail] = useState<RepositoryDetail>();
    const {id} = useParams();

    useEffect(() => {
        setIsLoading(true);
        if (id != undefined) {
            gitHubStore.getRepository({
                id: id
            }).then((result: ApiResponse<RepositoryDetail, any>) => {
                if (result.success) {
                    setRepoDetail(result.data);
                } else {
                    /* временное решение */
                    // eslint-disable-next-line no-console
                    console.log(result.status);
                }
            })
        }
        setIsLoading(false);
    });

    if (reposDetail != undefined) {
        return (
            <div className="repos-page">
                <div className="repos-page__name">{reposDetail.name}</div>
                <div className="repos-page__description">Описание: {reposDetail.description}</div>
                <div className="repos-page__language">Основной язык: {reposDetail.language}</div>
                <div className="repos-page__github-link"><a href={reposDetail.html_url}>Ссылка на github репозитория</a></div>
                <a href="./" className="repos-page__button">Назад</a>
            </div>
        );
    } else {
        return (
            <div className="reposPage">
                <div className="repos-page__error">Ошибка. Страница не найдена.</div>
                <a href="./" className="repos-page__button">Назад</a>
            </div>
        );
    }

};

export default ReposPage;