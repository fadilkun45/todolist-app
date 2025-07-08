import { del, get, post, put } from "@/lib/Axios"

const MasterApis = {
     postChecklist: function (data: any) {
        return post<any>('/checklist', data, { isAuth: true}).then(({ data }) => {
            return data
        })
    },
    getChecklist: function (params: string = "") {
        return get(`/checklist${params}`, { isAuth: true }).then(({ data }) => {
            return data
        })
    },
    deleteChecklist: function (params: string) {
        return del(`/checklist/${params}`, { isAuth: true }).then(({ data }) => {
            return data
        })
    },
     getChecklistItem: function (params: string = "") {
        return get(`/checklist/${params}/item`, { isAuth: true }).then(({ data }) => {
            return data
        })
    },
     postChecklistItem: function (notedId: any, data: any) {
        return post<any>(`/checklist/${notedId}/item`, data, { isAuth: true}).then(({ data }) => {
            return data
        })
    },
     deleteChecklistItem: function (noteId: any,id: any) {
        return del<any>(`/checklist/${noteId}/item/${id}`, { isAuth: true}).then(({ data }) => {
            return data
        })
    },
     editChecklistItem: function (notedId: any, id, data: any) {
        return put<any>(`/checklist/${notedId}/item/${id}`, data, { isAuth: true}).then(({ data }) => {
            return data
        })
    },
}


export default MasterApis