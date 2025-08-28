import React from "react";
import {ApiContext, type AuthContextType} from "@assets/context/api/ApiContext.tsx";

export const useAuth = () => {
    const context = React.useContext(ApiContext);

    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }

    return context as AuthContextType;
}