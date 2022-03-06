import './ReposPage.scss';

import {useEffect} from "react";

import NotFound from "@components/NotFound";
import Preloader from "@components/Preloader";
import GitHubStore from '@store/GitHubStore';
import {Meta} from "@utils/meta";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";

const gitHubStore = new GitHubStore();

const ReposPage = () => {

    const {id} = useParams();

    useEffect(() => {
        if (id !== undefined) {
            gitHubStore.getRepository({
                id: id,
            });
        }
    }, [id]);


    return (
        <div className="repos-page">
            {gitHubStore.meta === Meta.loading && <Preloader/>}
            {gitHubStore.meta === Meta.error && <NotFound/>}
            <div className="repos-page__name">{gitHubStore.repoDetail.name}</div>
            <div className="repos-page__description">Описание: {gitHubStore.repoDetail.description}</div>
            <div className="repos-page__language">Основной язык: {gitHubStore.repoDetail.language}</div>
            <div className="repos-page__github-link">
                <a href={gitHubStore.repoDetail.htmlUrl}>Ссылка на github репозитория</a>
            </div>
            <a href="./" className="repos-page__button">Назад</a>
        </div>
    );

};

export default observer(ReposPage);