import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {CssVarsProvider, CssBaseline} from '@mui/joy'
import {AppRoutes} from "./assets/routes/AppRoutes.tsx";
import {BrowserRouter} from "react-router-dom";
import '@fontsource/inter'

createRoot(document.getElementById('root')!).render(
    <StrictMode>

        <CssVarsProvider
            defaultMode={'dark'}
            modeStorageKey="theme_mode">
            <CssBaseline/>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </CssVarsProvider>
    </StrictMode>,
)
