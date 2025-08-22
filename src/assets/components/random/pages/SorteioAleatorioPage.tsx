import {DefaultContainer} from "@shared/DefaultContainer.tsx";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {SorteioPage} from "@components/random/pages/SorteioPage.tsx";
import {Tab, Tabs} from '@mui/material'

type tabType = 'numeros' | 'nomes'

export function SorteioAleatorioPage() {
    const location = useLocation()
    const navigate = useNavigate()

    const [tab, setTab] = useState<tabType>('numeros');

    useEffect(() => {
        const hash = location.hash.replace('#', '')
        if (hash.length > 0) {
            setTab(hash as tabType)
        } else {
            setTab('numeros')
        }

    }, [location.hash]);

    return (<DefaultContainer title={'sorteio aleatorio'}>
        <Tabs value={tab} onChange={(_, v) => {
            navigate({
                pathname: location.pathname,
                hash: v?.toString(),
            })
        }}>
            <Tab value={'numeros'} label={'Sorteio numerico'}/>
            <Tab value={'nomes'} label={'Sorteio nomeado'}/>
        </Tabs>
        <SorteioPage mode={tab == "numeros" ? 'number' : 'string'}/>


    </DefaultContainer>)
}