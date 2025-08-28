import type {IUser, IUserAuth} from "@assets/models/entities/user/IUser.ts";
import type {IResponse} from "@assets/models/endpoints/IResponse.ts";
import type {IPagination} from "@assets/models/endpoints/IPagination.ts";
import type {mailType} from "@assets/models/shared/mailType.ts";
import type {ISecretFriend} from "@assets/models/entities/secretFriend/ISecretFriend.ts";
import type {IListSecretFriendDto} from "@assets/models/requests/IListSecretFriendDto.ts";

const baseapi_v1 = `/api/v1`
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
        url: baseapi_v1 + '/account',
        'login': function (data: { email: mailType, password: string }) {
            return {
                url: this.url + '/login',
                method: 'POST',
                body: data,
            } as IApiRoute<IUserAuth>
        },
        'register': function (data: { name: string, email: string, password: string }) {
            return {
                url: this.url + '/register',
                method: 'POST',
                body: data,
                allowAnonymous: true,
            } as IApiRoute<IUserAuth>
        },
        'confirmMailWithId': function (data: { id: number, token: string }) {
            return {
                url: this.url + '/confirmmail',
                method: 'POST',
                body: data,
            } as IApiRoute<IUserAuth>
        },
        'confirmMail': function (data: { email: mailType, token: number }) {
            return {
                url: this.url + '/confirmmail',
                method: 'POST',
                body: data,
            } as IApiRoute<IUserAuth>
        }
    },
    'users': {
        url: baseapi_v1 + '/users',
        'list': function (data: { pagination: IPagination }) {
            return {
                url: this.url + '/list',
                pagination: data.pagination,
                method: 'GET'
            } as IApiRoute<IUser[]>
        },
    },
    'secretFriend': {
        url: baseapi_v1 + '/secretfriend',
        'list': function (data: {filters: IListSecretFriendDto, pagination: IPagination}) {
            const {filters, pagination} = data
            return {
                url: this.url + '/list',
                method: 'GET',
                query: filters,
                pagination,
            } as IApiRoute<ISecretFriend[]>
        }
    }
} as const