export interface Record {
    id: string
    websiteName: string
    url: string
    count: number
    originId: string
    sourceId: string
    published: boolean
    deleted: boolean
    createdAt: string
    updatedAt: string
    source?: Source
  }
  
  export interface Source {
    id: string
    name: string
    description: string
    deleted: boolean
    createdAt: string
    updatedAt: string
  }
  