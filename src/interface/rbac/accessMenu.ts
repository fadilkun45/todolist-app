import type { menuData } from "./menu"
import type { roleData } from "./role"

export interface postCreateAccessMenu {
    roleId: number
    menuId: number
}

export interface getAccessMenu {
    data: accessMenuData[]
  }


export interface accessMenuData {
    id: number
    roleId: number
    menuId: number
    role: roleData
    menu: menuData
  }
  
