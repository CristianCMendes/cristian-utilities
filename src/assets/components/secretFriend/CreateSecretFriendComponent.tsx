import {DefaultContainer} from "@shared/DefaultContainer.tsx";
import {Grid, TextField} from "@mui/material";
import {useState} from "react";
import type {ICreateSecretFriendDto} from "@assets/models/requests/ICreateSecretFriendDto.ts";
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {MoneyField} from "@shared/inputs/MoneyField.tsx";

export function CreateSecretFriendComponent() {
    const [data, setData] = useState<ICreateSecretFriendDto>({
        name: '',
        date: dayjs().add(1, 'month'),
        description: ''
    });

    return (<DefaultContainer size={12}>

        <Grid size={{xs: 12, md: 6}}>
            <TextField label={'Nome'}
                       value={data.name}
                       onChange={e => setData({...data, name: e.target.value})}/>
        </Grid>
        <Grid size={{xs: 12, md: 6}}>
            <DateTimePicker label={'Data'}
                            value={data.date}
                            onChange={e => setData({...data, date: dayjs(e)})}/>
        </Grid>
        <Grid size={12}>
            <TextField multiline
                       label={'Descrição'}
                       value={data.description}
                       onChange={(e) => {
                           setData({...data, description: e.target.value})
                       }}/>
        </Grid>
        <Grid size={{xs: 12, sm: 6}}>
            <MoneyField label={'Valor Minimo'} value={data.minimumPrice} onChange={(e) => {
                setData({...data, minimumPrice: e})
            }}/>
        </Grid>
        <Grid size={{xs: 12, sm: 6}}>
            <MoneyField label={'Valor Maximo'} value={data.maximumPrice} onChange={(e) => {
                setData({...data, maximumPrice: e})
            }}/>
        </Grid>
    </DefaultContainer>)
}