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
}

export default AuthServices