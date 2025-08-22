import {DefaultContainer} from "@shared/DefaultContainer.tsx";
import {useEffect, useMemo, useState} from "react";
import {asInt} from "@utils/numbers.ts";
import {FormControlLabel, Grid, Switch, TextField} from "@mui/material";

export function SorteioNumericoPage() {
    const [params, setParams] = useState(
        {min: 1, max: 100, qtd: 1, repeat: false}
    );
    const {min, max, qtd, repeat} = params;

    const qtdInvalida = useMemo<string | undefined>(() => {
        if (qtd < 0) {
            return 'Quantidade abaixo de 0'
        }

        if (qtd >= max - min && !repeat) {
            return `Quantidade de sorteios maior que a quantidade de sorteios possivel (${max - min} sorteios)`
        }

    }, [params]);

    useEffect(() => {
        if (min < 1) {
            setParams({...params, min: 1})
        }
    }, [min]);

    useEffect(() => {
        if (max < 1) {
            setParams({...params, max: 1})
        }
    }, [max]);


    return (<DefaultContainer>
        <Grid size={{sm: 6, md: 4}}>
            <TextField label={'Minimo'}
                       value={min}
                       onChange={e => {
                           setParams({...params, min: asInt(e.target.value)})
                       }}/>
        </Grid>
        <Grid size={{sm: 6, md: 4}}>
            <TextField label={'Maximo'}
                       value={max}
                       onChange={e => setParams({...params, max: asInt(e.target.value)})}/>
        </Grid>
        <Grid size={{sm: 6, md: 4}}>
            <TextField label={'Quantidade'}
                       error={qtdInvalida != undefined}
                       helperText={qtdInvalida}
                       value={qtd}
                       onChange={e => setParams({...params, qtd: asInt(e.target.value)})}/>
        </Grid>
        <Grid size={{sm: 6, md: 4}}>
            <FormControlLabel label={'Permite repetição'} control={<Switch/>} value={repeat}
                              onChange={(_,v) => setParams({...params, repeat: v})}/>
        </Grid>
    </DefaultContainer>)
}