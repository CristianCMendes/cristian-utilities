import {Badge, Divider, Drawer, ListItem, Stack, Typography} from "@mui/joy";
import {Link, useLocation} from "react-router-dom";
import {Casino, Home, Password, People, QrCode, Shuffle} from "@mui/icons-material";
import {useEffect} from "react";

interface DrawerMenuProps {
    open: boolean;
    onClose: () => void;
}

export function DrawerMenu(props: DrawerMenuProps) {
    const {open, onClose} = props;
    const location = useLocation()

    useEffect(() => {
        onClose();
    }, [location.pathname]);

    return (<Drawer open={open} onClose={onClose} variant={'soft'}>
        <Stack alignItems={'stretch'} justifyContent={'space-between'} flex={'content'}>
            <Stack sx={{p: 2}} gap={1}>
                <ListItem>
                    <Typography level={'title-lg'}>Utilidades gerais</Typography>
                </ListItem>
                <Divider/>
                <ListItem sx={{display: 'flex', justifyContent: 'space-between'}} component={Link} to={'/'}>
                    <Typography level={'body-md'}>Inicio</Typography>
                    <Typography>
                        <Home/>
                    </Typography>
                </ListItem>
                <ListItem sx={{display: 'flex', justifyContent: 'space-between'}} component={Link} to={'/sorteador'}>
                    <Typography level={'body-md'}>Sorteio aleatório</Typography>
                    <Typography>
                        <Shuffle/>
                    </Typography>
                </ListItem>
                <ListItem sx={{display: 'flex', justifyContent: 'space-between'}} component={Link}
                          to={'/gerador-senhas'}>
                    <Typography level={'body-md'}>Gerador de senhas</Typography>
                    <Typography>
                        <Password/>
                    </Typography>
                </ListItem>
                <ListItem sx={{display: 'flex', justifyContent: 'space-between'}} component={Link} to={'/qr-code'}>
                    <Typography level={'body-md'}>Gerador de QrCode</Typography>
                    <Typography>
                        <QrCode/>
                    </Typography>
                </ListItem>
                <ListItem sx={{display: 'flex', justifyContent: 'space-between'}} component={Link} to={'/dados'}>
                    <Typography level={'body-md'}>Rolagem de dados</Typography>
                    <Typography>
                        <Casino/>
                    </Typography>
                </ListItem>
                <ListItem sx={{display: 'flex', justifyContent: 'space-between'}} component={Link} to={'/amigo-secreto'}>
                    <Typography level={'body-md'}>Amigo secreto</Typography>
                    <Typography>
                        <Badge size={'sm'} color={'neutral'} badgeContent={'?'}>
                            <People/>
                        </Badge>
                    </Typography>
                </ListItem>
            </Stack>
            <Stack sx={{p: 2}} gap={1}>
                <ListItem sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography textAlign={'center'} level={'body-sm'}>Desenvolvido por Cristian C. Mendes</Typography>
                </ListItem>
            </Stack>
        </Stack>
    </Drawer>)
}