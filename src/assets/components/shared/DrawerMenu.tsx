import {Link as RouteLink, useLocation} from "react-router-dom";
import {Casino, Home, Password, People, QrCode2, Shuffle} from "@mui/icons-material";
import * as React from "react";
import {memo, useEffect} from "react";
import {routeAsPath, type ROUTES_KEYS} from "@routes/appRoutes.ts";
import {Badge, Link, Divider, Drawer, ListItem, Stack, Typography} from "@mui/material";
import {useAuth} from "@assets/context/api/useAuth.ts";

interface DrawerMenuProps {
    open: boolean;
    onClose: () => void;
}

export function DrawerMenu(props: DrawerMenuProps) {
    const {user} = useAuth()
    const {open, onClose} = props;
    const location = useLocation()

    useEffect(() => {
        onClose();
    }, [location.pathname]);

    const Li = memo(({label, url, icon}:
                     { label: string, url: ROUTES_KEYS, icon: React.ReactElement }) => {
        return (<ListItem sx={{display: 'flex', justifyContent: 'space-between'}} dense>
                <Link component={RouteLink} to={routeAsPath(url)} variant={'overline'}>{label}</Link>
                <Typography>
                    {icon}
                </Typography>
            </ListItem>
        )
    })


    return (<Drawer open={open} onClose={onClose}>
        <Stack alignItems={'stretch'} justifyContent={'space-between'} flex={'content'}>
            <Stack sx={{p: 2}} gap={1}>
                <ListItem>
                    <Typography variant={'subtitle1'}>Utilidades gerais</Typography>
                </ListItem>
                <Divider/>
                <Li url={"index"} icon={<Home/>} label={'Inicio'}/>
                <Li label={'Sorteio aleatório'} url={'sorteioAleatorio'} icon={<Shuffle/>}/>
                <Li label={'Gerador de senhas'} url={'geradorSenhas'} icon={<Password/>}/>
                <Li label={'Gerador de QrCode'} url={'geradorQrCode'} icon={<QrCode2/>}/>
                <Li label={'Rolagem de dados'} url={'rolagemDados'} icon={<Casino/>}/>
                <Li label={'Amigo secreto'} url={'amigoSecreto'}
                    icon={<Badge variant={'standard'} badgeContent={'?'}><People/></Badge>}/>
                {user == null && <Li label={'Login'} url={'login'} icon={<People/>}/>}
            </Stack>
            <Stack sx={{p: 2}} gap={1}>
                <ListItem sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography textAlign={'center'} variant={'caption'}>Desenvolvido por Cristian C.
                        Mendes</Typography>
                </ListItem>
            </Stack>
        </Stack>
    </Drawer>)
}