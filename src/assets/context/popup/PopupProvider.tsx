import {PopupContext} from "@assets/context/popup/PopupContext.tsx";
import {type PropsWithChildren, useState} from "react";
import {PopupComponent, type PopupComponentProps} from "@shared/PopupComponent.tsx";

export const PopupProvider = ({children}: PropsWithChildren) => {
    const [popups, setPopups] = useState<PopupComponentProps[]>([]);

    const addPopup = (popup: PopupComponentProps) => {
        setPopups([...popups, popup])
    }

    const removePopup = (index: number) => {
        setPopups(popups.filter((_, i) => i !== index))
    }

    return (<PopupContext.Provider value={{addPopup}}>
        {children}
        {popups.map((popup, index) => (
            <PopupComponent key={index} {...popup} onClose={() => removePopup(index)}/>))}
    </PopupContext.Provider>)
}