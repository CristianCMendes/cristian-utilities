import {DefaultContainer} from "@shared/DefaultContainer.tsx";
import React, {useEffect} from "react";
import {usePages} from "@hooks/usePages.ts";
import {Tabs, Tab, Button, Grid} from "@mui/material";
import {useLocation} from "react-router-dom";
import {AddOutlined} from "@mui/icons-material";
import {usePopup} from "@assets/context/popup/usePopup.ts";
import {CreateSecretFriendComponent} from "@components/secretFriend/CreateSecretFriendComponent.tsx";

type tabType = 'my' | 'participating'

export function SecretFriendIndexPage() {
    const location = useLocation()

    const {getTab, setTab} = usePages()
    const {addPopup} = usePopup()

    const [currentTab, setCurrentTab] = React.useState<tabType>('my')

    useEffect(() => {
        setCurrentTab(getTab<tabType>('secretfriend') ?? 'my')
    }, [location.search]);

    const handleCreate = () => {
        addPopup({
            title: 'Criar novo amigo secreto',
            content: <CreateSecretFriendComponent/>
        })
    }

    return <DefaultContainer title={'Amigo secreto'}>
        <Grid size={12} container px={1} justifyContent={'space-between'}>
            <Grid/>
            <Grid>
                <Button onClick={handleCreate} variant={'contained'} endIcon={<AddOutlined/>}>Criar novo amigo
                    secreto</Button>
            </Grid>
        </Grid>
        <Grid size={12} container>
            <Tabs value={currentTab} onChange={(_, v) => {
                setTab('secretfriend', v as tabType)
            }}>
                <Tab value={'my'} label={'Criados por mim'}/>
                <Tab value={'participating'} label={'Que eu participo'}/>
            </Tabs>
        </Grid>


    </DefaultContainer>
}