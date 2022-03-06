export type GetOrganizationReposListParams = {
    organizationName: string;
}

export type GetRepositoryListParams = {
    id: string;
}

export interface IGitHubStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<void>;
}
