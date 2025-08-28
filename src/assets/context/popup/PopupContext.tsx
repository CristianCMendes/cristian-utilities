import type {PopupComponentProps} from "@shared/PopupComponent.tsx";
import React from "react";

export type PopupContextType = {
    addPopup: (popup: PopupComponentProps) => void,
    closePopup: (props?: { index?: number }) => void
}

export const PopupContext = React.createContext<PopupContextType | null>(null)