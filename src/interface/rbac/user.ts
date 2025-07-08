import type { roleData } from "./role"

export interface postCreateUser {
    username: string
    email: string
    firstname: string
    lastname: string
    password: string
    isActive: boolean
    roleId?: number
}


export interface getUser {
    success?: boolean
    statusCode?: number
    message?: string
    data: userData[]
    meta: Meta
  }
  
export interface userData {
    id: number
    username: string
    email: string
    firstname: string
    lastname: string
    token: any
    isActive: boolean
    imagePath: any
    thumbnailPath: any
    roleId?: number
    role: roleData
}
  
  export interface Meta {
    page: number
    pageSize: number
    totalData: number
    totalPages: number
  }
  

  export interface getUserProfile {
    success: boolean
    statusCode: number
    message: string
    data: userProfile
    meta: any
  }
  
  export interface userProfile {
    id: number
    username: string
    email: string
    firstname: string
    lastname: string
    token: any
    isActive: boolean
    imagePath: any
    thumbnailPath: any
    roleId: number
    role: roleData
  }
  