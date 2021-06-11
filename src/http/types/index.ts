export type Method = "get" | "post"

export interface AxiosRequestConfig {
    url: string;
    method?: Method;
    data?: any;
    params?: any;
}