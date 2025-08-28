import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {AppRoutes} from '@components/shared/AppRoutes.tsx'
import {BrowserRouter} from "react-router-dom";
import {registerPWA} from "./pwa-registrer.ts";
import {Analytics} from "@vercel/analytics/react"
import {SpeedInsights} from "@vercel/speed-insights/react"
import {ToastContainer} from "react-toastify";
import {PopupProvider} from "@assets/context/popup/PopupProvider.tsx";
import {ApiProvider} from "@assets/context/api/ApiProvider.tsx";
import {ThemeProvider} from "@assets/models/shared/ThemeProvider.tsx";

import '@fontsource/inter'

registerPWA()

document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        // Eu odeio apertar sem querer ctrl + s no meu navegador...
    }
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Analytics/>
        <SpeedInsights/>
        <ThemeProvider>
            <BrowserRouter>
                <ApiProvider>
                    <PopupProvider>
                        <AppRoutes/>
                    </PopupProvider>
                </ApiProvider>
            </BrowserRouter>
            <ToastContainer theme={'dark'}
                            style={{zIndex: 999}}
                            draggable
                            position={"bottom-center"}
                            closeOnClick
                            stacked/>
        </ThemeProvider>
    </StrictMode>,
)
