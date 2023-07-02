export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    posts: Post[];
}

export interface Post {
    id: number;
    content: string;
    createdAt: string;
    authorId: number;
    author: User;
}