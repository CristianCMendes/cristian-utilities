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
        zIndex: 10000, backdropFilter: 'blur(5px)'
    }}>
        <DefaultContainer maxWidth={'95%'}
                          {...containerProps}>
            {content}
        </DefaultContainer>
    </Backdrop>)
}