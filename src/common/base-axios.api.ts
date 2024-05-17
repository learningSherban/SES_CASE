import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
import { injectable } from "inversify";
import 'reflect-metadata'

export interface IRequestConfig {
    url: string;
    method: "get" | "post" | "put" | "delete";
    params?: { [key: string]: any };
    payload?: { [key: string]: any };
    responseType?: ResponseType;
    headers?: AxiosHeaders;
}

@injectable()
export class BaseAxiosApi {
    protected baseURL!: string;
    protected authorization!: string;

    constructor() {
    }

    public async request<T>(config: IRequestConfig): Promise<AxiosResponse<T>> {
        try {
            const req: AxiosRequestConfig = {
                baseURL: this.baseURL,
                url: config.url,
                method: config.method,
                params: config.params || {},
                data: config.payload || {},
                ...(config?.responseType && { responseType: config.responseType }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${this.authorization}`,
                    ...config.headers,
                },
            };
            const response = await axios.request<T>(req);
            return response;
        } catch (error: any) {
            console.log("AXIOS REQUEST ERROR", error);
            throw new Error("AXIOS REQUEST ERROR");
        }
    }
}
