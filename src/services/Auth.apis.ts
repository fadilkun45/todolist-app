import type { postLogin } from "@/interface/auth/login"
import type { postRegiser } from "@/interface/auth/register"
import type { postCreateAccessMenu } from "@/interface/rbac/accessMenu"
import type { postCreateMenu } from "@/interface/rbac/menu"
import type { postCreateRole } from "@/interface/rbac/role"
import type { postCreateUser } from "@/interface/rbac/user"
import { get, patch, post } from "@/lib/Axios"
import { cookies } from "@/lib/utils"

const AuthServices = {
    login: function (data: postLogin) {
        return post<any>('/login', data).then(({ data }) => {
            console.log(data)
            if (data.statusCode === 2110) {
                cookies.saveCookie(import.meta.env.VITE_API_COOKIES_AUTH, data.data.token)
            }
            return data
        })
    },
     postRegister: function (data: postRegiser) {
        return post<any>('/register', data).then(({ data }) => {
            return data
        })
    },
    getUser: function (params: string = "") {
        return get(`/user${params}`, { isAuth: true }).then(({ data }) => {
            return data
        })
    },
    postUser: function (body: postCreateUser) {
        return post(`/user`, body, { isAuth: true }).then(({ data }) => {
            return data
        })
    },
    updateUser: function (id: number, body: postCreateUser) {
        return patch(`/user/${id}`, body, { isAuth: true }).then(({ data }) => {
            return data
        })
    },
    getRole: function (params: string = "") {
        return get(`/role${params}`, { isAuth: true }).then(({ data }) => {
            return data
        })
    },
    postRole: function (body: postCreateRole) {
        return post(`/role`, body, { isAuth: true }).then(({ data }) => {
            return data
        })
    },
    updateRole: function (id: number, body: postCreateRole) {
        return patch(`/role/${id}`, body, { isAuth: true }).then(({ data }) => {
            return data
        })
    },
    getMenu: function (params: string = "") {
        return get(`/menu${params}`, { isAuth: true }).then(({ data }) => {
            return data
        })
    },
    postMenu: function (body: postCreateMenu) {
        return post(`/menu`, body, { isAuth: true }).then(({ data }) => {
            return data
        })
    },
    updateMenu: function (id: number, body: postCreateMenu) {
        return patch(`/menu/${id}`, body, { isAuth: true }).then(({ data }) => {
            return data
        })
    },
    getAccessMenu: function (params: string = "") {
        return get(`/role-access${params}`, { isAuth: true }).then(({ data }) => {
            return data
        })
    },
    postAccessMenu: function (body: postCreateAccessMenu[]) {
        return post(`/role-access/bulk-insert`, body, { isAuth: true }).then(({ data }) => {
            return data
        })
    },
    updateAccessMenu: function (id: number, body:  postCreateAccessMenu[]) {
        return post(`/role-access/bulk-update`, body, { isAuth: true }).then(({ data }) => {
            return data
        })
    },
    getUserProfile: function () {
        return get(`/auth/profile`, { isAuth: true }).then(({ data }) => {
            return data
        })
    },
    getUserMenu: function () {
        return get(`/auth/list-menu`, { isAuth: true }).then(({ data }) => {
            return data
        })
    },
    getAccessMenuForUser: function () {
        return get(`/auth/list-access-menu`, { isAuth: true }).then(({ data }) => {
            return data
        })
    },

}

export default AuthServices