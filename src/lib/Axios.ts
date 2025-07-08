import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { cookies } from './utils';


export interface Config extends AxiosRequestConfig {
    isAuth?: boolean
}


const createAxiosInstance = (baseURL: string, config?: Config): AxiosInstance => {
    const instance = axios.create({
        baseURL,
        ...config,
    });

    console.log("config", config?.isAuth)

    instance.interceptors.request.use(
        (request) => {
            const config =  (request as any)

            if (config.isAuth) {
                request.headers['Authorization'] = `Bearer ${cookies.getCookie(import.meta.env.VITE_API_COOKIES_AUTH)}`;
            }
            return request;
        },
        (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
        (response) => response,
        (error) => Promise.reject(error)
    );

    return instance;
};

export const api = createAxiosInstance(import.meta.env.VITE_API_BASE_URL || '');

export const get = <T = unknown>(url: string, config?: Config ): Promise<AxiosResponse<T>> =>
    api.get<T>(url, config);

export const post = <T = unknown>(url: string, data?: unknown, config?: Config): Promise<AxiosResponse<T>> =>
    api.post<T>(url, data, config);

export const put = <T = unknown>(url: string, data?: unknown, config?: Config): Promise<AxiosResponse<T>> =>
    api.put<T>(url, data, config);

export const del = <T = unknown>(url: string, config?: Config): Promise<AxiosResponse<T>> =>
    api.delete<T>(url, config);

export const patch = <T = unknown>(url: string,data?: unknown, config?: Config): Promise<AxiosResponse<T>> =>
    api.patch<T>(url, data, config);

export default api;