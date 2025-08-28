import {createTheme, CssBaseline, ThemeProvider as TP} from "@mui/material";
import '@mui/x-date-pickers/themeAugmentation'
import 'dayjs/locale/pt-br.js'
import {type DatePickerProps, type DateTimePickerProps, LocalizationProvider} from "@mui/x-date-pickers";
import {ptBR as ptBrPicker} from "@mui/x-date-pickers/locales";
import {ptBR} from "@mui/material/locale";
import React from "react";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";


const defaultDateProps = {
    ampm: false,
    format: 'DD/MM/YYYY HH:mm',
    slotProps: {
        textField: {
            fullWidth: true,
            variant: 'filled'
        },
        actionBar: {
            actions: ['today', 'clear']
        }
    }
}

const theme = createTheme({
        palette: {
            mode: 'dark',
        },
        components: {
            MuiTextField: {
                defaultProps: {
                    fullWidth: true,
                    variant: 'filled',
                }
            },
            MuiDatePicker: {
                defaultProps: {
                    ...defaultDateProps as Partial<DatePickerProps>,
                }
            },
            MuiDateTimePicker: {
                defaultProps: {
                    ...defaultDateProps as Partial<DateTimePickerProps>,
                }
            },
            MuiIconButton: {
                defaultProps: {
                    sx: {
                        borderRadius: 2
                    }
                }
            }
        },
        shape: {
            borderRadius: 2
        }
    },
    ptBrPicker,
    ptBR)

export const ThemeProvider = ({children}: { children: React.ReactElement[] }) => {
    return (<TP theme={theme}>
        <CssBaseline/>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'pt-Br'}>
            {children.map((child) => (
                child
            ))}
        </LocalizationProvider>
    </TP>)
}