export interface Config {
    id: string;
    enable: boolean;
    title: string;
    title_en: string;
    description: string;
    description_en: string;
    syncDataAt: string;
    checkDataAt: string;
    createdAt: string;
    updatedAt: string;
}
export interface Record {
    id: string;
    websiteName: string;
    url: string;
    count: number;
    originId: string;
    sourceId: string;
    published: boolean;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    source?: Source;
    comments?: Comment[];
  }
  
  export interface Source {
    id: string;
    name: string;
    description: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Comment {
    id: string;
    message: string;
    record: Record;
    recordId: string;
    commentIP: string;
    published: boolean;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
  }

  
export type APIResponse<T> = {
  code: number;
  data: T;
  msg: string;
};