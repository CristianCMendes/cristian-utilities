import {DefaultContainer} from "@shared/DefaultContainer.tsx";
import {memo, useEffect, useMemo, useState} from "react";
import {asInt} from "@utils/numbers.ts";
import {
    Backdrop,
    Button,
    ButtonGroup,
    Chip,
    CircularProgress,
    FormControlLabel,
    Grid,
    IconButton,
    Stack,
    Switch,
    TextField
} from "@mui/material";
import {randomUtils} from "@utils/randomUtils.ts";
import dayjs, {Dayjs} from "dayjs";
import {SorteioComponent} from "@components/random/SorteioComponent.tsx";
import {Send} from "@mui/icons-material";

export type SorteioMode = 'number' | 'string'

const RollsList = memo(function RollsList({rolls}: { rolls: { roll: number | string, data: Dayjs }[] }) {
    return (
        <Grid size={12}>
            {rolls.map((r, idx) => (
                <SorteioComponent key={`${r.data.valueOf()}-${r.roll}-${idx}`} value={r.roll} datetime={r.data}/>
            ))}
        </Grid>
    );
});

interface SorteioPageProps {
    mode?: SorteioMode
}

export function SorteioPage({mode = 'number'}: SorteioPageProps) {
    // Estado comum
    const [loading, setLoading] = useState(false)

    // Estado para números
    const [numParams, setNumParams] = useState({min: 1, max: 100, qtd: 1, repeat: false})

    // Estado para strings
    const [strParams, setStrParams] = useState({options: [] as string[], input: '', qtd: 1, repeat: false})

    const [rolls, setRolls] = useState<{ roll: number | string, data: Dayjs }[]>([])

    const qtdInvalida = useMemo<string | undefined>(() => {
        if (mode === 'number') {
            const {min, max, qtd, repeat} = numParams
            if (min > max) return 'Mínimo não pode ser maior que o máximo'
            if (qtd < 0) return 'Quantidade abaixo de 0'
            const totalPossiveis = (max - min + 1)
            if (!repeat && qtd > totalPossiveis) return `Quantidade maior que o possível sem repetição (${totalPossiveis} valores)`
            return undefined
        } else {
            const {options, qtd, repeat} = strParams
            if (options.length === 0) return 'Forneça pelo menos 1 opção'
            if (qtd < 0) return 'Quantidade abaixo de 0'
            if (!repeat && qtd > options.length) return `Quantidade maior que o possível sem repetição (${options.length} valores)`
            return undefined
        }
    }, [mode, numParams, strParams]);

    const handleSorteio = (clear: boolean = false) => {
        setLoading(true)
        setTimeout(() => {
            try {
                const baseRolls: { roll: number | string, data: Dayjs }[] = clear ? [] : [...rolls]
                const now = dayjs()

                if (mode === 'number') {
                    const {min, max, qtd, repeat} = numParams
                    const minVal = Math.min(min, max)
                    const maxVal = Math.max(min, max)

                    if (!repeat) {
                        const total = maxVal - minVal + 1
                        const quantidade = Math.min(qtd, total)
                        const usados = new Set<number>()
                        while (usados.size < quantidade) {
                            usados.add(randomUtils().getRandomNumber({min: minVal, max: maxVal}))
                        }
                        for (const v of usados) baseRolls.push({roll: v, data: now})
                    } else {
                        for (let i = 0; i < qtd; i++) {
                            const roll = randomUtils().getRandomNumber({min: minVal, max: maxVal});
                            baseRolls.push({roll, data: now})
                        }
                    }
                } else {
                    const {options, qtd, repeat} = strParams

                    if (!repeat) {
                        const quantidade = Math.min(qtd, options.length)
                        const usados = new Set<number>()
                        while (usados.size < quantidade) {
                            usados.add(randomUtils().getRandomNumber({min: 0, max: options.length - 1}))
                        }
                        for (const idx of usados) baseRolls.push({roll: options[idx], data: now})
                    } else {
                        for (let i = 0; i < qtd; i++) {
                            const item = randomUtils().getRandomItem({values: options})
                            baseRolls.push({roll: item, data: now})
                        }
                    }
                }

                setRolls(baseRolls)
            } finally {
                setLoading(false)
            }
        }, 200)
    }

    // Correções/validações básicas
    useEffect(() => {
        if (mode === 'number') {
            const {min, max, qtd} = numParams
            if (min < 1) setNumParams({...numParams, min: 1})
            if (max < 1) setNumParams({...numParams, max: 1})
            if (qtd < 1) setNumParams({...numParams, qtd: 1})
        } else {
            const {qtd} = strParams
            if (qtd < 1) setStrParams({...strParams, qtd: 1})
        }
    }, [mode, numParams.min, numParams.max, numParams.qtd, strParams.qtd])

    // Set distinto pra saber qual foi rolado
    const rolledStrings = useMemo(() => {
        const set = new Set<string>();
        for (const r of rolls) {
            if (typeof r.roll === 'string') set.add(r.roll as string)
        }
        return set;
    }, [rolls])

    const addOptionsFromInput = () => {
        const values = parseOptions(strParams.input);
        if (values.length === 0) return;
        setStrParams({...strParams, options: [...strParams.options, ...values], input: ''});
    }

    const removeOptionAt = (index: number) => {
        setStrParams({...strParams, options: strParams.options.filter((_, i) => i !== index)});
    }

    return (
        <DefaultContainer rowSpacing={1.5}>
            {mode === 'number' ? (
                <>
                    <Grid size={{sm: 6, md: 4}}>
                        <TextField label={'Minimo'}
                                   value={numParams.min}
                                   onChange={e => setNumParams({...numParams, min: asInt(e.target.value)})}/>
                    </Grid>
                    <Grid size={{sm: 6, md: 4}}>
                        <TextField label={'Maximo'}
                                   value={numParams.max}
                                   onChange={e => setNumParams({...numParams, max: asInt(e.target.value)})}/>
                    </Grid>
                    <Grid size={{sm: 12, md: 4}} container justifyContent={'end'}>
                        <Grid/>
                        <Grid size={{sm: 4, md: 12}}>
                            <TextField label={'Quantidade'}
                                       error={qtdInvalida != undefined}
                                       helperText={qtdInvalida}
                                       value={numParams.qtd}
                                       onChange={e => setNumParams({...numParams, qtd: asInt(e.target.value)})}/>
                        </Grid>
                    </Grid>
                    <Grid size={12} container alignItems={'center'} justifyItems={'center'}
                          justifyContent={'space-between'}>
                        <Grid size={4}>
                            <FormControlLabel label={'Permitir repetição'} control={<Switch checked={numParams.repeat}
                                                                                            onChange={(_, v) => setNumParams({
                                                                                                ...numParams,
                                                                                                repeat: v
                                                                                            })}/>}/>
                        </Grid>
                        <Grid size={8}>
                            <ButtonGroup fullWidth variant={'contained'} size={'medium'}
                                         disabled={qtdInvalida != null || loading}>
                                <Button disabled={rolls.length == 0 || loading}
                                        color={'warning'}
                                        onClick={() => setRolls([])}>Limpar</Button>
                                <Button disabled={loading} color={'secondary'} onClick={() => handleSorteio(true)}>Limpar
                                    e sortear</Button>
                                <Button disabled={loading} onClick={() => handleSorteio()}>Sortear</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </>
            ) : (
                <>
                    <Grid size={{sm: 12, md: 8}}>
                        <Grid container spacing={1}>
                            <Grid size={12}>
                                <TextField label={'Adicionar opção'}
                                           value={strParams.input}
                                           onChange={e => setStrParams({...strParams, input: e.target.value})}
                                           slotProps={{
                                               input: {
                                                   endAdornment: <IconButton onClick={addOptionsFromInput}
                                                                             disabled={strParams.input.trim().length === 0}>
                                                       <Send/>
                                                   </IconButton>
                                               }
                                           }}
                                           onKeyDown={e => {
                                               if (e.key === 'Enter') {
                                                   e.preventDefault();
                                                   addOptionsFromInput();
                                               }
                                           }}
                                           placeholder={'Digite um valor e pressione Enter'}/>
                            </Grid>
                            <Grid size={12}>
                                <Stack direction={'row'} spacing={1} useFlexGap flexWrap={'wrap'}>
                                    {strParams.options.map((opt, idx) => (
                                        <Chip key={`${idx}-${opt}`} label={opt} onDelete={() => removeOptionAt(idx)}
                                              color={rolledStrings.has(opt) ? 'primary' : 'default'}/>
                                    ))}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid size={{sm: 12, md: 4}} container justifyContent={'end'}>
                        <Grid/>
                        <Grid size={{sm: 4, md: 12}}>
                            <TextField label={'Quantidade'}
                                       error={qtdInvalida != undefined}
                                       helperText={qtdInvalida}
                                       value={strParams.qtd}
                                       onChange={e => setStrParams({...strParams, qtd: asInt(e.target.value)})}/>
                        </Grid>
                    </Grid>
                    <Grid size={12} container alignItems={'center'} justifyItems={'center'}
                          justifyContent={'space-between'}>
                        <Grid size={4}>
                            <FormControlLabel label={'Permitir repetição'} control={<Switch checked={strParams.repeat}
                                                                                            onChange={(_, v) => setStrParams({
                                                                                                ...strParams,
                                                                                                repeat: v
                                                                                            })}/>}/>
                        </Grid>
                        <Grid size={8}>
                            <ButtonGroup fullWidth variant={'contained'} size={'medium'}
                                         disabled={qtdInvalida != null || loading}>
                                <Button disabled={rolls.length == 0 || loading}
                                        color={'warning'}
                                        onClick={() => setRolls([])}>Limpar</Button>
                                <Button disabled={loading} color={'secondary'} onClick={() => handleSorteio(true)}>Limpar
                                    e sortear</Button>
                                <Button disabled={loading} onClick={() => handleSorteio()}>Sortear</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </>
            )}

            <RollsList rolls={rolls}/>

            <Backdrop open={loading} sx={{color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1}}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </DefaultContainer>
    )
}

function parseOptions(text: string): string[] {
    return text
        .split(/\r?\n|,/g)
        .map(s => s.trim())
        .filter(s => s.length > 0)
}
