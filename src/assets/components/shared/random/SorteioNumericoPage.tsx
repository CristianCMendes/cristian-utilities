import {DefaultContainer} from "@shared/DefaultContainer.tsx";
import {useMemo, useState} from "react";
import {asInt} from "@utils/numbers.ts";
import {Grid, TextField} from "@mui/material";

export function SorteioNumericoPage() {
    const [values, setValues] = useState(
        {min: 1, max: 100, qtd: 1, repeat: false}
    );
    const {min, max, qtd, repeat} = values;

    const qtdInvalida = useMemo<string | undefined>(() => {
        if (qtd < 0) {
            return 'Quantidade abaixo de 0'
        }

        if (qtd < max - min && !repeat) {
            return `Quantidade de sorteios maior que a quantidade de sorteios possivel (${max - min} sorteios)`
        }

    }, [values]);


    return (<DefaultContainer>
        <Grid size={{sm: 4, md: 6}}>
            <TextField label={'Minimo'}
                       value={min}
                       onChange={e => {
                           setValues({...values, min: asInt(e.target.value)})
                       }}/>
        </Grid>
        <Grid size={{sm: 4, md: 6}}>
            <TextField label={'Maximo'}
                       value={max}
                       onChange={e => setValues({...values, max: asInt(e.target.value)})}/>
        </Grid>
        <Grid size={{sm: 4, md: 6}}>
            <TextField label={'Quantidade'}
                       error={qtdInvalida != undefined}
                       helperText={qtdInvalida}
                       value={qtd}
                       onChange={e => setValues({...values, qtd: asInt(e.target.value)})}/>
        </Grid>
    </DefaultContainer>)
}