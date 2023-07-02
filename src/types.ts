export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    posts: Post[];
    profile: Profile;
}

export interface Post {
    id: number;
    content: string;
    createdAt: string;
    authorId: number;
    author: User;
}

export interface Profile {
    id: number;
    bio: string;
    profileImageUrl: string;
    userId: number;
    user: User;
}