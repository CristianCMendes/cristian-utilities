import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material'
import {AppRoutes} from '@components/shared/AppRoutes.tsx'
import {BrowserRouter} from "react-router-dom";
import {registerPWA} from "./pwa-registrer.ts";
import {Analytics} from "@vercel/analytics/react"
import {SpeedInsights} from "@vercel/speed-insights/react"

import '@fontsource/inter'
import {ToastContainer} from "react-toastify";
import {PopupProvider} from "@assets/context/popup/PopupProvider.tsx";
import {ApiProvider} from "@assets/context/api/ApiProvider.tsx";

registerPWA()

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
    components: {
        MuiTextField: {
            defaultProps: {
                fullWidth: true,
                variant: 'filled'
            }
        }
    }
})

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
        <ThemeProvider theme={theme}>
            <ToastContainer theme={'dark'}
                            style={{zIndex: 100000}}
                            draggable
                            position={"bottom-center"}
                            closeOnClick
                            stacked/>
            <CssBaseline/>
            <BrowserRouter>
                <PopupProvider>
                    <ApiProvider>
                        <AppRoutes/>
                    </ApiProvider>
                </PopupProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
)
