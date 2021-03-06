import {ApiResponse} from '@shared/store/ApiStore/types';

export type GetOrganizationReposListParams = {
    organizationName: string;
}

export type GetRepositoryListParams = {
    id: string;
}

export type GitHubRepoOwner = {
    id: number;
    url: string;
    avatar_url: string;
    login: string;
}

export type RepoItem = {
    id: number;
    url: string;
    name: string;
    stargazers_count: number;
    owner: GitHubRepoOwner;
};

export type RepositoryDetail = {
    id: number;
    name: string;
    description: string;
    html_url: string;
    private: boolean;
    language: string;
    stargazers_count: number;
    owner: GitHubRepoOwner;
};

export interface IGitHubStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], any>>;
}
