import {DefaultContainer} from "@shared/DefaultContainer.tsx";
import {memo, useEffect, useState} from "react";
import {Button, FormControlLabel, Grid, Switch, TextField} from "@mui/material";
import {asInt} from "@utils/numbers.ts";

interface ruleType {
    active: boolean;
    size?: number;
}

interface ruleset {
    length: number;
    uppercase: ruleType
    lowercase: ruleType
    numbers: ruleType
    symbols: ruleType
    genCount: number
}

const RuleTextfield = memo(function RuleTextfield({
                                                      label,
                                                      value,
                                                      setValue,
                                                      max
                                                  }: {
    label: string;
    value: ruleType;
    setValue: (r: ruleType) => void;
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

export function PwdGenPage() {
    const [rules, setRules] = useState<ruleset>({
        length: 12,
        uppercase: {active: true},
        lowercase: {active: true},
        numbers: {active: true},
        symbols: {active: true},
        genCount: 1
    });

    const [pwds, setPwds] = useState<string[]>([]);

    return (<DefaultContainer title={'gerador de senhas'} rowSpacing={0.5}>
        <Grid size={12} container justifyContent={'end'}>
            <Grid size={{xs: 12, sm: 6}}>
                <TextField label={'Senhas geradas'}
                           variant={'filled'}
                           value={rules.genCount}
                           onChange={e => {
                               setRules({...rules, genCount: asInt(e.target.value)})
                           }}
                />
            </Grid>
            <Grid size={{xs: 12, sm: 6}}>
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
                <RuleTextfield label={'Numeros'} value={rules.numbers} setValue={(r) => {
                    setRules({...rules, numbers: r})
                }}/>
            </Grid>
            <Grid container size={12}>
                <RuleTextfield label={'Caracteres especiais'} value={rules.symbols} setValue={(r) => {
                    setRules({...rules, symbols: r})
                }}/>
            </Grid>
            <Grid container size={12} justifyContent={'space-between'}>
                <Grid/>
                <Grid size={{xs: 12, sm: 4}}>
                    <Button>Gerar</Button>
                </Grid>
            </Grid>
        </Grid>
    </DefaultContainer>)
}