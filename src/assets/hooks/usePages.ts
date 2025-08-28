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

    function getTab<T>(name: string): T {
        return searchParams.get('tab_' + name as string) as T
    }

    function setTab<T>(name: T, value: T) {
        setSearchParams({...searchParams, ['tab_' + name as string]: value})
    }

    function navigate({to, options}: navigateProps) {
        return routerNavigate({...to, pathname: routeAsPath(to.pathname)}, options)
    }

    return {getTab, setTab, navigate}
}