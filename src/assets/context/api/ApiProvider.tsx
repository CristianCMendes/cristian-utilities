import {ApiContext, type requestOptions} from "@assets/context/api/ApiContext.tsx";
import React, {useEffect, useMemo, useState} from "react";
import {API_ROUTES, type IApiRoute} from "@routes/apiRoutes.ts";
import {createSearchParams} from "react-router-dom";
import dayjs from "dayjs";
import type {IResponse} from "@assets/models/endpoints/IResponse.ts";
import type {IUserAuth} from "@assets/models/entities/user/IUser.ts";
import type {mailType} from "@assets/models/shared/mailType.ts";
import {useToast} from "@hooks/useToast.ts";
import {isMatch} from 'lodash'

interface IMonitorPromise {
    promise: Promise<Response>,
    endpoint: IApiRoute,
    timestamp: number,
    ended: boolean
}

export const ApiProvider = ({children}: React.PropsWithChildren) => {
    const [user, setUser] = useState<IUserAuth>()
    const {toastFromResponse, toastFromMessage} = useToast()

    useEffect(() => {
        const userstore = localStorage.getItem('user')
        if (userstore != null) {
            try {
                setUser(JSON.parse(userstore))
            } catch {
                // pass
            }
        }
    }, []);

    useEffect(() => {
        if (user != null) {
            localStorage.setItem('user', JSON.stringify(user))
        }
    }, [user]);


    const login = async (data: { email: mailType, password: string }) => {
        const {email, password} = data
        const endpoint = API_ROUTES.account.login({email, password})

        return request(endpoint).then(res => {
            toastFromResponse(res)
            if (res.statusCode == 200) {
                setUser(res.data)
            }
            return res;
        })
    }

    const register = (data: { name: string, email: string, password: string }) => {
        const {name, email, password} = data
        const endpoint = API_ROUTES.account.register({name, email: email, password})
        return request(endpoint).then(x => {
            if (x.statusCode == 201 && x.data?.token != null) {
                setUser(x.data)
            }
            toastFromResponse(x)
            return x;
        })
    }

    const confirmMailWithId = (data: { id: number, token: string }) => {
        const {id, token} = data
        const endpoint = API_ROUTES.account.confirmMailWithId({id, token})
        return request(endpoint)
    }

    const confirmMail = (data: { email: mailType, token: number }) => {
        const {email, token} = data
        const endpoint = API_ROUTES.account.confirmMail({email, token})
        return request(endpoint)
    }


    const logout = () => {
        setUser(undefined)
        localStorage.removeItem('user')
        toastFromMessage({
            type: 'success',
            message: 'Desconectado com sucesso',
            important: false,
        })
    }

    const [promises, setPromises] = useState<IMonitorPromise[]>([]);


    function buildEndpoint(routedata: IApiRoute) {
        const {pagination, query} = routedata
        let url = routedata.url + "?";
        if (pagination != null) {
            url += createSearchParams({
                page: pagination.page.toString(),
                pageSize: pagination.pageSize.toString(),
            })
        }
        if (query != null) {
            for (const [key, value] of Object.entries(query)) {
                url += `&${key}=${value}`
            }
        }
        return url
    }

    function buildOptions(endpoint: IApiRoute, options?: requestOptions): RequestInit {
        const authorization = user?.token != null ? {
            'Authorization': `Bearer ${user?.token}`
        } : undefined;

        const fetchOptions = {
            method: endpoint.method,
            cache: options?.ignoreCache ? 'no-store' : 'default',
            headers: {
                ...authorization,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(endpoint.body)
        }

        return fetchOptions as RequestInit
    }

    const isLoading = useMemo(() => {

        return promises.filter(x => {
            return !x.ended || dayjs().diff(dayjs(x.timestamp), 'milliseconds') < 0.33
        }).length > 0
    }, [promises])


    async function request<T>(endpoint: IApiRoute<T>, options?: requestOptions): Promise<IResponse<T>> {
        // if there is a request recently with the same endpoint data don't allow the user to make the request
        // Get requests dont need to be ignored because it will hit cache
        const hasRecently = promises.filter(x => x.endpoint.method != "GET" && isMatch(endpoint, x.endpoint))

        if (hasRecently.length != 0) {
            const r: IResponse = {
                statusCode: 500,
                pagination: {page: 1, pageSize: 10, ...endpoint.pagination},
                messages: [{
                    message: "Muitas solicitações iguais, por favor, aguarde uns segundos, e tente novamente",
                    type: "warning",
                    important: false,
                }]
            }

            toastFromResponse(r)

            return r as IResponse<T>;
        }

        const url = buildEndpoint(endpoint)
        const fetchOptions = buildOptions(endpoint, options)


        const res = fetch(url, fetchOptions);

        const promise: IMonitorPromise = {
            promise: res,
            timestamp: dayjs().valueOf(),
            ended: false,
            endpoint: endpoint
        }

        if (!options?.ignoreMonitor) {
            setPromises(x => [...x, promise])
        }

        return await res.then(x => x.json()).then((x: IResponse<T>) => {
                console.log(x)

                const importantMsgs = x.messages.filter(x => x.important)
                if (importantMsgs.length > 0) {
                    importantMsgs.forEach(x => toastFromMessage(x))
                }

                return x
            }
        ).finally(() => {
            promise.ended = true
            setInterval(() => {
                setPromises(prev => prev.filter(x => x.promise != promise.promise))
            }, 2500)
        }) ?? {
            statusCode: 500,
            pagination: {page: 1, pageSize: 10, ...endpoint.pagination},
            messages: [{message: "Erro interno", type: "error"}]
        };
    }


    return (<ApiContext.Provider value={{
        request,
        isLoading,
        user,
        login,
        logout,
        register,
        confirmMailWithId,
        confirmMail
    }}>{children}</ApiContext.Provider>)
}