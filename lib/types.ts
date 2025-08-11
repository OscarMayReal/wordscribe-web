export interface BlogInfo {
    name: string;
    description?: string;
    imageUrl: string;
    plan: string;
}

export interface Post {
    id: string;
    title: string;
    content: any;
    action: string;
    writer: string;
    createdAt: string;
    public: boolean;
    draftContent: any;
}

export interface User {
    name: {
        firstName: string;
        lastName:string;
    };
    imageUrl: string;
    username: string;
}
