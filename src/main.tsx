import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material'
import {AppRoutes} from "@routes/AppRoutes.tsx";
import {BrowserRouter} from "react-router-dom";
import {registerPWA} from "./pwa-registrer.ts";
import {Analytics} from "@vercel/analytics/react"
import {SpeedInsights} from "@vercel/speed-insights/react"

import '@fontsource/inter'

registerPWA()

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
    components: {
        MuiTextField: {
            defaultProps: {
                fullWidth: true
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
            <CssBaseline/>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
)
