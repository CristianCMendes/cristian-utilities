import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createTheme, CssBaseline as MuiCssBaseline, ThemeProvider} from '@mui/material'
import {AppRoutes} from "@routes/AppRoutes.tsx";
import {BrowserRouter} from "react-router-dom";

import '@fontsource/inter'

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


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MuiCssBaseline/>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
)
