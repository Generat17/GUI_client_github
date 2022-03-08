export type GitHubRepoOwnerApi = {
    id: number;
    url: string;
    avatar_url: string;
    login: string;
    name: string;
    type: string;
    location: string;
    email: string;
    blog: string;
    created_at: string;
    updated_at: string;
    twitter_username: string;
    html_url: string;
    public_repos: number;
    followers: number;
    following: number;
};

export type GitHubRepoOwnerModel = {
    id: number;
    url: string;
    avatarUrl: string;
    login: string;
    name: string;
    userType: string;
    location: string;
    email: string;
    blog: string;
    createdAt: Date;
    updatedAt: Date;
    twitter: string;
    htmlUrl: string;
    publicRepos: number;
    followers: number;
    following: number;
};

export const getInitialGitHubRepoOwner = (): GitHubRepoOwnerModel => ({
    id: 0,
    url: '',
    avatarUrl: '',
    login: '',
    name: '',
    userType: '',
    location: '',
    email: '',
    blog: '',
    createdAt: new Date(0),
    updatedAt: new Date(0),
    twitter: '',
    htmlUrl: '',
    publicRepos: 0,
    followers: 0,
    following: 0,
});

export const normalizeGitHubRepoOwner = (from: GitHubRepoOwnerApi): GitHubRepoOwnerModel => ({
    id: from.id,
    url: from.url,
    avatarUrl: from.avatar_url,
    login: from.login,
    name: from.name,
    userType: (from.type === 'Organization') ? 'orgs' : 'users',
    location: from.location,
    email: from.email,
    blog: from.blog,
    createdAt: new Date(from.created_at),
    updatedAt: new Date(from.updated_at),
    twitter: from.twitter_username,
    htmlUrl: from.html_url,
    publicRepos: from.public_repos,
    followers: from.followers,
    following: from.following,
});