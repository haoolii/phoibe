export interface Source {
    id: string;
    name: string;
    description: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    Records: Record[]
}

export interface Comment {
    id:string;
    message: string;
    published: boolean;
    deleted: boolean;
    record: Record;
    recordId: string;
    createdAt: string;
    updatedAt: string;
}

export interface Record {
    id?: string;
    websiteName: string;
    url: string;
    count: number;
    originId: string;
    source: Source;
    sourceId: string;
    published: boolean;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    comments: Comment[];
}