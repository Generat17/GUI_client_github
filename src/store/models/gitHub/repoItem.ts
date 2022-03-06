import {GitHubRepoOwnerApi, GitHubRepoOwnerModel, normalizeGitHubRepoOwner} from './gitHubRepoOwner';

export type RepoItemApi = {
    id: number;
    url: string;
    name: string;
    stargazers_count: number;
    updated_at: string;
    pushed_at: string;
    owner: GitHubRepoOwnerApi;
};

export type RepoItemModel = {
    id: number;
    url: string;
    name: string;
    stargazersCount: number;
    updatedAt: Date;
    pushedAt: Date;
    owner: GitHubRepoOwnerModel;
};

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => ({
    id: from.id,
    url: from.url,
    name: from.name,
    stargazersCount: from.stargazers_count,
    updatedAt: new Date(from.updated_at),
    pushedAt: new Date(from.pushed_at),
    owner: normalizeGitHubRepoOwner(from.owner)
});