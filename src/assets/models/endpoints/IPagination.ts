export type IPagination = {
    page: number,
    pageSize: number,
    total?: number,
    hasNext?: boolean,
    /*It doest come from backend, it is used to precess info in the frontend*/
    isLoading?: boolean,
    ignoreCache?: boolean,
}
