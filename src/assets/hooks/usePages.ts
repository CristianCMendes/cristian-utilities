import {
    useSearchParams,
    useNavigate,
    type Path,
    type NavigateOptions
} from "react-router-dom";
import {routeAsPath, type ROUTES_KEYS} from "@routes/appRoutes.ts";

interface navigateProps {
    to: {
        pathname: ROUTES_KEYS,
    } & Partial<Path>,
    options?: NavigateOptions
}

export const usePages = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const routerNavigate = useNavigate()

    function getTab<T>(tab: T): T {
        return searchParams.get('tab_' + tab as string) as T
    }

    function setTab<T>(tab: T, value: T) {
        setSearchParams({...searchParams, ['tab_' + tab as string]: value})
    }

    function navigate({to, options}: navigateProps) {
        return routerNavigate({...to, pathname: routeAsPath(to.pathname)}, options)
    }

    return {getTab, setTab, navigate}
}