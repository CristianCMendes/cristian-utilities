import {DefaultContainer} from "../DefaultContainer.tsx";
import {useEffect, useState} from "react";
import {Tabs, Tab, TabList} from "@mui/joy";
import {useLocation, useNavigate} from "react-router-dom";

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
            <TabList>
                <Tab>Sorteio numerico</Tab>
                <Tab>Sorteio nomeado</Tab>
            </TabList>
        </Tabs>
    </DefaultContainer>)
}