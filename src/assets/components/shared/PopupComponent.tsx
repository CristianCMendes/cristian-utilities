import {Backdrop} from "@mui/material";
import {DefaultContainer} from "@shared/DefaultContainer.tsx";
import React from "react";

export interface PopupComponentProps extends Omit<React.ComponentProps<typeof DefaultContainer>, 'content'> {
    content: React.ReactElement,
    onClose?: () => void
}

export function PopupComponent({content, onClose, ...containerProps}: PopupComponentProps) {
    return (<Backdrop open={true} onClick={(e) => {
        if (e.target == e.currentTarget) {
            onClose?.()
        }
    }} style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 999, backdropFilter: 'blur(5px)'
    }}>
        <DefaultContainer maxWidth={'90%'}
                          {...containerProps}>
            {content}
        </DefaultContainer>
    </Backdrop>)
}