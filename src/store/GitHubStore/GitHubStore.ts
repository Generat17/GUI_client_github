import ApiStore from '@shared/store/ApiStore';
import {HTTPMethod} from '@shared/store/ApiStore/types';
import {
    normalizeRepoItem,
    normalizeRepositoryDetail,
    RepoItemApi,
    RepoItemModel, RepositoryDetailApi,
    RepositoryDetailModel
} from "@store/models/gitHub";
import {Meta} from "@utils/meta";
import {ILocalStore} from "@utils/useLocalStore";
import {action, computed, makeObservable, observable, runInAction} from "mobx";

import {
    GetOrganizationReposListParams,
    GetRepositoryListParams,
    IGitHubStore
} from "./types";

const BASE_URL = 'https://api.github.com';

type PrivateFields = "_list" | "_meta" | "_repoDetail";

export default class GitHubStore implements IGitHubStore, ILocalStore {
    private readonly apiStore = new ApiStore(BASE_URL);

    private _list: RepoItemModel[] = [];
    private _meta: Meta = Meta.initial;
    private _repoDetail: RepositoryDetailModel = {
        id: 0,
        name: '',
        description: '',
        htmlUrl: '',
        private: false,
        language: '',
        stargazersCount: 0,
        owner: {
            id: 0,
            url: '',
            avatarUrl: '',
            login: '',
        }
    };

    constructor() {
        makeObservable<GitHubStore, PrivateFields>(this, {
            _list: observable.ref,
            _meta: observable,
            _repoDetail: observable,
            list: computed,
            meta: computed,
            repoDetail: computed,
            getOrganizationReposList: action,
            getRepository: action
        });

    }

    get list(): RepoItemModel[] {
        return this._list;
    }

    get repoDetail(): RepositoryDetailModel {
        return this._repoDetail;
    }

    get meta(): Meta {
        return this._meta;
    }

    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<void> {
        this._meta = Meta.loading;
        this._list = [];

        const response = await this.apiStore.request<RepoItemApi[]>({
            method: HTTPMethod.GET,
            data: {},
            headers: {},
            endpoint: `/orgs/${params.organizationName}/repos`
        })

        runInAction(() => {
            if (response.success) {
                try {
                    this._meta = Meta.success;
                    this._list = response.data.map(normalizeRepoItem);
                    return;
                }
                catch (e) {
                    this._meta = Meta.error;
                    this._list = [];
                }
            }

        })

    }

    async getRepository(params: GetRepositoryListParams): Promise<void> {
        this._meta = Meta.loading;
        this._repoDetail = {
            id: 0,
            name: '',
            description: '',
            htmlUrl: '',
            private: false,
            language: '',
            stargazersCount: 0,
            owner: {
                id: 0,
                url: '',
                avatarUrl: '',
                login: '',
            }
        };

        const response = await this.apiStore.request<RepositoryDetailApi>({
            method: HTTPMethod.GET,
            data: {},
            headers: {},
            endpoint: `/repositories/${params.id}`
        })

        runInAction(() => {
            if (response.success) {
                try {
                    this._meta = Meta.success;
                    this._repoDetail = normalizeRepositoryDetail(response.data);
                    return;
                }
                catch (e) {
                    this._meta = Meta.error;
                    this._repoDetail = {
                        id: 0,
                        name: '',
                        description: '',
                        htmlUrl: '',
                        private: false,
                        language: '',
                        stargazersCount: 0,
                        owner: {
                            id: 0,
                            url: '',
                            avatarUrl: '',
                            login: '',
                        }
                    };
                }
            }

        })

    }

    destroy(): void {
        // nothing to do
    }
}
