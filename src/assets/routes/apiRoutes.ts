import type {IUser, IUserAuth} from "@assets/models/entities/user/IUser.ts";
import type {IResponse} from "@assets/models/endpoints/IResponse.ts";
import type {IPagination} from "@assets/models/endpoints/IPagination.ts";
import type {mailType} from "@assets/models/shared/mailType.ts";
import type {ISecretFriend} from "@assets/models/entities/secretFriend/ISecretFriend.ts";
import type {IListSecretFriendDto} from "@assets/models/requests/IListSecretFriendDto.ts";

type method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

/**
 * Define the default methods to fetch info from api
 * @param T the type of the data to be returned
 * @param method the method to be used
 * @param body the body to be sent
 * @param query the query to be sent
 * @param pagination the pagination to be sent
 * @param returnType the type of the response to be returned
 */
export interface IApiRoute<T = any> {
    url: string,
    method: method,
    body?: object,
    query?: object,
    pagination?: IPagination,
    returnType?: IResponse<T>,
}


export const API_ROUTES = {
    'account': {
        'login': function (data: { email: mailType, password: string }) {
            return {
                url: `api/v1/Account/Login`,
                method: 'POST',
                body: data,
            } as IApiRoute<IUserAuth>
        },
        'register': function (data: { name: string, email: string, password: string }) {
            return {
                url: `api/v1/Account/Register`,
                method: 'POST',
                body: data,
                allowAnonymous: true,
            } as IApiRoute<IUserAuth>
        },
        'confirmMailWithId': function (data: { id: number, token: string }) {
            return {
                url: `api/v1/Account/${data.id}/ConfirmMail`,
                method: 'POST',
                body: data,
            } as IApiRoute<IUserAuth>
        },
        'confirmMail': function (data: { email: mailType, token: number }) {
            return {
                url: `api/v1/Account/ConfirmMail`,
                method: 'POST',
                body: data,
            } as IApiRoute<IUserAuth>
        }
    },
    'users': {
        'list': function (data: { pagination: IPagination }) {
            return {
                url: `api/v1/Users/List`,
                pagination: data.pagination,
                method: 'GET'
            } as IApiRoute<IUser[]>
        },
    },
    'secretFriend': {
        'list': function (data: { filters: IListSecretFriendDto, pagination: IPagination }) {
            const {filters, pagination} = data
            return {
                url: `api/v1/SecretFriend/List`,
                method: 'GET',
                query: filters,
                pagination,
            } as IApiRoute<ISecretFriend[]>
        },
        'create': function (data: {
            name: string,
            date: Date,
            description?: string,
            minimumPrice?: number,
            maximumPrice?: number
        }) {
            return {
                url: `api/v1/SecretFriend/Create`,
                method: 'POST',
                body: data,
            } as IApiRoute<ISecretFriend>
        }
    }
} as const