import ApiStore from '@shared/store/ApiStore';
import {HTTPMethod} from '@shared/store/ApiStore/types';
import {
    getInitialGitHubRepoOwner,
    getInitialRepoDetail, GitHubRepoOwnerApi, GitHubRepoOwnerModel, normalizeGitHubRepoOwner,
    normalizeRepoItem,
    normalizeRepositoryDetail,
    RepoItemApi,
    RepoItemModel, RepositoryDetailApi,
    RepositoryDetailModel
} from "@store/models/gitHub";
import {
    CollectionModel,
    getInitialCollectionModel,
    linearizeCollection,
    normalizeCollection
} from "@store/models/shared/collection";
import {Meta} from "@utils/meta";
import {ILocalStore} from "@utils/useLocalStore";
import {action, computed, makeObservable, observable, runInAction} from "mobx";

import {
    GetOrganizationReposListParams,
    GetRepositoryListParams, GetReposOwnerParams,
    IGitHubStore
} from "./types";

const BASE_URL = 'https://api.github.com';

type PrivateFields = "_list" | "_meta" | "_repoDetail" | "_owner";

export default class GitHubStore implements IGitHubStore, ILocalStore {
    private readonly apiStore = new ApiStore(BASE_URL);

    private _list: CollectionModel<number, RepoItemModel> = getInitialCollectionModel();
    private _meta: Meta = Meta.initial;
    private _repoDetail: RepositoryDetailModel = getInitialRepoDetail();
    private _owner: GitHubRepoOwnerModel = getInitialGitHubRepoOwner();

    constructor() {
        makeObservable<GitHubStore, PrivateFields>(this, {
            _list: observable.ref,
            _meta: observable,
            _repoDetail: observable,
            _owner: observable,
            list: computed,
            meta: computed,
            repoDetail: computed,
            owner: computed,
            getOrganizationReposList: action,
            getRepository: action,
            getReposOwner: action,
        });

    }

    get list(): RepoItemModel[] {
        return linearizeCollection(this._list);
    }

    get repoDetail(): RepositoryDetailModel {
        return this._repoDetail;
    }

    get meta(): Meta {
        return this._meta;
    }

    get owner(): GitHubRepoOwnerModel {
        return this._owner;
    }

    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<void> {
        this._meta = Meta.loading;
        this._list = getInitialCollectionModel();

        const response = await this.apiStore.request<RepoItemApi[]>({
            method: HTTPMethod.GET,
            data: {},
            headers: {},
            endpoint: `/${params.userType}/${params.organizationName}/repos`
        })

        runInAction(() => {
            if (!response.success) {
                this._meta = Meta.error;
            }

            try {
                const list: RepoItemModel[] = [];
                for (const item of response.data) {
                    list.push(normalizeRepoItem(item));
                }

                this._meta = Meta.success;
                this._list = normalizeCollection(list, (listItem) => listItem.id);
                return;
            } catch (e) {
                this._meta = Meta.error;
                this._list = getInitialCollectionModel();
            }
        })
    }

    async getRepository(params: GetRepositoryListParams): Promise<void> {
        this._meta = Meta.loading;
        this._repoDetail = getInitialRepoDetail();

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
                } catch (e) {
                    this._meta = Meta.error;
                    this._repoDetail = getInitialRepoDetail();
                }
            }
        })
    }

    async getReposOwner(params: GetReposOwnerParams): Promise<void> {
        this._meta = Meta.loading;
        this._owner = getInitialGitHubRepoOwner();

        const response = await this.apiStore.request<GitHubRepoOwnerApi>({
            method: HTTPMethod.GET,
            data: {},
            headers: {},
            endpoint: `/users/${params.organizationName}`
        })

        runInAction(() => {
            if (response.success) {
                try {
                    this._meta = Meta.success;
                    this._owner = normalizeGitHubRepoOwner(response.data);
                    return;
                } catch (e) {
                    this._meta = Meta.error;
                    this._owner = getInitialGitHubRepoOwner();
                }
            }
        })
    }

    destroy(): void {
        // nothing to do
    }
}
