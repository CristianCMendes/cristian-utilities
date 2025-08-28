import {Link as RouteLink, Outlet} from "react-router-dom";
import {Logout, Menu} from "@mui/icons-material";
import {DrawerMenu} from "./DrawerMenu.tsx";
import {useState} from "react";
import {Box, Grid, Typography, Paper, IconButton, Link} from "@mui/material";
import {useAuth} from "@assets/context/api/useAuth.ts";

export function AppLayout() {
    const {user, logout} = useAuth()
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (<Box>
        <Grid component={Paper} container justifyContent={'space-between'} alignItems={"center"} sx={{p: 1}}>
            <Grid container alignItems={'center'}>
                <Grid>
                    <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
                        <Menu/>
                    </IconButton>
                </Grid>
                <Grid>
                    <Link variant={'button'} component={RouteLink} to={'/'}>Inicio</Link>
                </Grid>
            </Grid>
            {user != null && <Grid container alignItems={'center'}>
                <Grid>
                    <Typography variant={'caption'} color={'textDisabled'}>Olá {user.name}</Typography>
                </Grid>
                <Grid>
                    <IconButton color={'error'} onClick={logout}>
                        <Logout/>
                    </IconButton>
                </Grid>
            </Grid>}
        </Grid>
        <Grid gap={1} sx={{my: 2, mx: 5, p: 1}} columns={12}>
            <Outlet/>
        </Grid>
        <Box sx={{position: 'fixed', bottom: 0, width: '100%'}}>
            <Typography sx={{
                color: 'GrayText',
                p: .5,
                textAlign: 'center'
            }} variant={'caption'} textAlign={'center'}>Desenvolvido por Cristian C.
                Mendes</Typography>
        </Box>
        <DrawerMenu open={drawerOpen} onClose={() => setDrawerOpen(false)}/>
    </Box>)
}