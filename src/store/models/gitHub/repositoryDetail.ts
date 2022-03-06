import {GitHubRepoOwnerApi, GitHubRepoOwnerModel, normalizeGitHubRepoOwner} from "./gitHubRepoOwner";

export type RepositoryDetailApi = {
    id: number;
    name: string;
    description: string;
    html_url: string;
    private: boolean;
    language: string;
    stargazers_count: number;
    owner: GitHubRepoOwnerApi;
};

export type RepositoryDetailModel = {
    id: number;
    name: string;
    description: string;
    htmlUrl: string;
    private: boolean;
    language: string;
    stargazersCount: number;
    owner: GitHubRepoOwnerModel;
};

export const normalizeRepositoryDetail = (from: RepositoryDetailApi): RepositoryDetailModel => ({
    id: from.id,
    name: from.name,
    description: from.description,
    htmlUrl: from.html_url,
    private: from.private,
    language: from.language,
    stargazersCount: from.stargazers_count,
    owner: normalizeGitHubRepoOwner(from.owner),
});