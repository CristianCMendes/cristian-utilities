import type {IApiRoute} from "@routes/apiRoutes.ts";
import type {IUserAuth} from "@assets/models/entities/user/IUser.ts";
import type {mailType} from "@assets/models/shared/mailType.ts";
import type {IResponse} from "@assets/models/endpoints/IResponse.ts";
import React from "react";


/**
 * Options for the api provider
 * @property ignoreCache if true, the request will ignore the cache
 * @property ignoreMonitor if true, wont add the request to the loading queue
 */
export interface requestOptions {
    ignoreCache?: boolean,
    ignoreMonitor?: boolean,
}

export type AuthContextType = {
    user?: IUserAuth,
    login: (data: { email: mailType, password: string }) => Promise<IResponse<IUserAuth>>,
    register: (data: { name: string, email: mailType, password: string }) => Promise<IResponse<IUserAuth>>,
    confirmMail: (data: { email: mailType, token: number }) => Promise<IResponse<IUserAuth>>,
    confirmMailWithId: (data: { id: number, token: string }) => Promise<IResponse<IUserAuth>>,
    logout: () => void
}

export type ApiContextType = {
    request: (endpoint: IApiRoute, options?: requestOptions) => Promise<typeof endpoint.returnType>,
    isLoading: boolean,
}


export const ApiContext = React.createContext<ApiContextType & AuthContextType | null>(null)
