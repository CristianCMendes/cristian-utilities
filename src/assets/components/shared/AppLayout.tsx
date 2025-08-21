import {Box, Grid, IconButton, Sheet, Typography} from "@mui/joy";
import {Link, Outlet} from "react-router-dom";
import {Menu} from "@mui/icons-material";
import {DrawerMenu} from "./DrawerMenu.tsx";
import {useState} from "react";

export function AppLayout() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (<Box>

        <Grid component={Sheet} variant={'soft'} container alignItems={"center"} gap={1} sx={{p: 1}}>
            <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
                <Menu/>
            </IconButton>
            <Typography level={'title-lg'} component={Link} to={'/'}>Inicio</Typography>
        </Grid>
        <Grid gap={1} sx={{my: 2, mx: 5, p: 1}} columns={12}>
                <Outlet/>
        </Grid>
        <Box sx={{position: 'fixed', bottom: 0, width: '100%'}}>
            <Typography level={'body-xs'} sx={{
                color: 'GrayText',
                p: .5,
                textAlign: 'center'
            }} variant={'soft'} textAlign={'center'}>Desenvolvido por Cristian C.
                Mendes</Typography>
        </Box>
        <DrawerMenu open={drawerOpen} onClose={() => setDrawerOpen(false)}/>
    </Box>)
}