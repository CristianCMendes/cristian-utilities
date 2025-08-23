import {DefaultContainer} from "@shared/DefaultContainer.tsx";
import {memo, useEffect, useMemo, useState} from "react";
import {Button, ButtonGroup, FormControlLabel, Grid, IconButton, Switch, TextField, Typography} from "@mui/material";
import {asInt} from "@utils/numbers.ts";
import type {IRuleType} from "@assets/models/pwdRules/IRuleType.ts";
import type {IRuleSet} from "@assets/models/pwdRules/IRuleSet.ts";
import {usePwdGen} from "@assets/hooks/usePwdGen.tsx";
import {ContentCopy} from '@mui/icons-material'

const RuleTextfield = memo(function RuleTextfield({
                                                      label,
                                                      value,
                                                      setValue,
                                                      max
                                                  }: {
    label: string;
    value: IRuleType;
    setValue: (r: IRuleType) => void;
    max?: number
}) {
    // Caso altere a quantidade automaticamente ativa
    useEffect(() => {
        setValue({...value, active: true})
    }, [value.size]);


    return (
        <TextField
            variant={'filled'}
            label={label}
            value={value.size ?? 0}
            focused={value.active}
            onChange={(e) => {
                setValue({...value, size: Math.min(asInt(e.target.value), max ?? 999)});
            }}
            slotProps={{
                input: {
                    endAdornment: (
                        <FormControlLabel
                            label={'Ativo'}
                            labelPlacement={'start'}
                            control={
                                <Switch
                                    checked={value.active}
                                    onChange={(_, v) => {
                                        setValue({...value, active: v});
                                    }}
                                />
                            }
                        />
                    ),
                },
            }}
        />
    );
});

const PwdHold = memo((props: { pwds: string[] }) => {

    return <Grid container size={12} spacing={1}>
        {props.pwds.map((x) => {
            return <Grid size={{xs: 6, sm: 4, md: 3}}><TextField variant={'outlined'} size={'small'} value={x} disabled
                                                                 slotProps={{
                                                                     input: {
                                                                         endAdornment: <IconButton size={'small'}
                                                                                                   onClick={() => {
                                                                                                       navigator.clipboard.writeText(x).then(() => {
                                                                                                       })
                                                                                                   }}>
                                                                             <ContentCopy/>
                                                                         </IconButton>,
                                                                     }
                                                                 }}/></Grid>
        })}
    </Grid>
})

export function PwdGenPage() {
    const [rules, setRules] = useState<IRuleSet>({
        length: 12,
        uppercase: {active: true},
        lowercase: {active: true},
        numbers: {active: true},
        symbols: {active: true},
        genCount: 1
    });

    const {setRules: setHookRules, generatePwds} = usePwdGen();
    const [pwds, setPwds] = useState<string[]>([]);

    const currRulesNeeds = useMemo(() => {
        const upperNeeds = rules.uppercase.active ? rules.uppercase.size ?? 0 : 0;
        const lowerNeeds = rules.lowercase.active ? rules.lowercase.size ?? 0 : 0;
        const numberNeeds = rules.numbers.active ? rules.numbers.size ?? 0 : 0;
        const symbolNeeds = rules.symbols.active ? rules.symbols.size ?? 0 : 0;

        return upperNeeds + lowerNeeds + numberNeeds + symbolNeeds;
    }, [rules.uppercase.active, rules.lowercase.active, rules.numbers.active, rules.symbols.active])


    useEffect(() => {
        setHookRules(rules);
    }, [rules, setHookRules]);

    return (<DefaultContainer title={'gerador de senhas'} rowSpacing={0.5}>
        <Grid size={12} container justifyContent={'end'}>

            <Grid size={12}>
                <TextField label={'Tamanho'}
                           variant={'filled'}
                           value={rules.length}
                           onChange={e => {
                               setRules({...rules, length: asInt(e.target.value)})
                           }}
                />
            </Grid>
            <Grid container size={12}>
                <RuleTextfield label={'Letras maiusculas'}
                               max={rules.length}
                               value={rules.uppercase}
                               setValue={(r) => {
                                   setRules({...rules, uppercase: r})
                               }}/>
            </Grid>
            <Grid container size={12}>
                <RuleTextfield label={'Letras minusculas'}
                               max={rules.length}
                               value={rules.lowercase}
                               setValue={(r) => {
                                   setRules({...rules, lowercase: r})
                               }}/>
            </Grid>
            <Grid container size={12}>
                <RuleTextfield label={'Numeros'}
                               max={rules.length}
                               value={rules.numbers} setValue={(r) => {
                    setRules({...rules, numbers: r})
                }}/>
            </Grid>
            <Grid container size={12}>
                <RuleTextfield label={'Caracteres especiais'}
                               max={rules.length}
                               value={rules.symbols} setValue={(r) => {
                    setRules({...rules, symbols: r})
                }}/>
            </Grid>
            <Grid container size={12} justifyContent={'space-between'}>
                <ButtonGroup fullWidth>
                    <Grid size={{xs: 12, sm: 6}}>
                        <TextField label={'Quantidade'}
                                   variant={'filled'}
                                   value={rules.genCount}
                                   onChange={e => {
                                       setRules({...rules, genCount: asInt(e.target.value)})
                                   }}
                        />
                    </Grid>
                    <Grid size={{xs: 12, sm: 6}}>
                        <Button
                            sx={{height: '100%', maxHeight: '100%'}}
                            disabled={currRulesNeeds > rules.length}
                            variant={'contained'}
                            onClick={() => setPwds(generatePwds(rules.genCount))}>{currRulesNeeds > rules.length ? `Suas regras precisam de no minimo ${currRulesNeeds} caracteres` : 'Gerar'}</Button>
                    </Grid>
                </ButtonGroup>
            </Grid>
            <Grid size={12} container>
                <Grid size={12}><Typography variant={'caption'}>Senhas geradas</Typography></Grid>
                <PwdHold pwds={pwds}/>
            </Grid>
        </Grid>
    </DefaultContainer>)
}