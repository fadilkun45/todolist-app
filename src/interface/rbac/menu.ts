export interface postCreateMenu {
    menuName: string,
    frontendPath: string,
    parentId?: number,
    isActive?: boolean
}

export interface getMenu {
    success?: boolean
    statusCode?: number
    message?: string
    data: menuData[]
    meta: Meta
}

export interface menuData {
    id: number
    icon: string
    frontendPath: string
    menuName: string
    parentId: string
    parentName?: string | null
    children?: menuData[]
    isActive: boolean
}

export interface Meta {
    page: number
    pageSize: number
    totalData: number
    totalPages: number
}

export interface ListMenuSidebar {
    id: number
    roleName: string
    isActive: boolean
    listMenu: menuData[]
  }


export interface NavbarMenu {
    title: string
    url?: string
    icon?: any
    isActive?: boolean
    items: NavbarMenu[]
    
}
