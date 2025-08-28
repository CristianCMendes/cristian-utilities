import {ApiContext, type ApiContextType} from "@assets/context/api/ApiContext.tsx";
import {useContext} from "react";

export const useApi = () => {
    const context = useContext(ApiContext)

    if (!context) {
        throw new Error('useApi deve ser usado dentro de um ApiProvider')
    }

    return context as ApiContextType;
}