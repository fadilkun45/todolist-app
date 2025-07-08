export interface postCreateRole {
    roleName: string,
    isActive: boolean
}

export interface getRole {
    success?: boolean
    statusCode?: number
    message?: string
    data: roleData[]
    meta: Meta
}

export interface roleData {
    id: number
    roleName: string
    isActive: boolean
}

export interface Meta {
    page: number
    pageSize: number
    totalData: number
    totalPages: number
}



