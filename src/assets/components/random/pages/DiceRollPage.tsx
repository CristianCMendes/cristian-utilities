import {DefaultContainer} from "@shared/DefaultContainer.tsx";
import {memo, useCallback, useMemo, useState} from "react";
import {Button, FormControlLabel, Grid, IconButton, Menu, MenuItem, Paper, Switch, Typography} from "@mui/material";
import {type DiceType, DiceTypes, DiceTypeValue} from "@assets/models/dice/DiceType.ts";
import type {IDiceRoll} from "@assets/models/dice/IDiceRoll.ts";
import {randomUtils} from "@utils/randomUtils.ts";
import {Casino, Delete} from '@mui/icons-material'


const Dice = memo(({diceType, onRemove, reRoll}: {
    diceType: IDiceRoll, onRemove: () => void, reRoll?: () => void
}) => {
    const {roll, dice} = diceType
    const value = DiceTypeValue[dice]
    const color = value == roll ? 'green' : roll == 1 ? 'red' : 'white'


    return (<Grid container alignItems={'center'} color={color} component={Paper} elevation={2}
                  justifyContent={'space-between'}>
        <IconButton size={'small'} onClick={reRoll} color={'inherit'}>
            <Casino/>
        </IconButton>
        <Typography color={'inherit'}>{diceType.roll}/{diceType.dice}</Typography>
        <IconButton color={'inherit'} size={'small'}
                    onClick={onRemove}>
            <Delete/>
        </IconButton>
    </Grid>)
})

const AddButton = memo(({onAdd}: {
    onAdd: (d: DiceType) => void
}) => {
    const [anchor, setAnchor] = useState<HTMLElement | null>()

    return (
        <>
            <Menu open={Boolean(anchor)}
                  onClose={() => setAnchor(null)}
                  anchorEl={anchor}>
                {DiceTypes.map((x) => {
                    return <MenuItem value={x} onClick={() => {
                        onAdd(x)
                        setAnchor(null)
                    }}>{x}</MenuItem>
                })}
            </Menu>
            <Button variant={'outlined'} onClick={(e) => {
                setAnchor(e.currentTarget)
            }}>Adicionar</Button>
        </>
    )
})

export function DiceRollPage() {
    const [rules, setRules] = useState<{
        rollOnAdd: boolean
    }>({
        rollOnAdd: true
    });
    const [dices, setDices] = useState<IDiceRoll[]>([]);

    const rollCount = useMemo(() => {
        return dices.reduce((acc, v) => acc + v.roll, 0)
    }, [dices]);

    const rollAll = useCallback(() => {
        const newDices = [...dices]
        for (const d of newDices) {
            d.roll = randomUtils().getRandomNumber({min: 1, max: DiceTypeValue[d.dice]})
        }
        setDices(newDices)
    }, [dices])

    return <DefaultContainer title={"Rolagem de dados"}>
        <Grid size={12} container justifyContent={'space-between'} alignItems={'center'} mb={1}>
            <Grid>
                <Button variant={'outlined'} onClick={rollAll}>Rolar</Button>
            </Grid>
            <Grid container spacing={1}>
                <Grid>
                    <FormControlLabel control={<Switch checked={rules?.rollOnAdd ?? false} onChange={(_, v) => {
                        setRules({...rules, rollOnAdd: v})
                    }}/>} label={'Rolar ao adicionar'} labelPlacement={'start'}/>
                </Grid>
                <Grid>
                    <AddButton onAdd={(d) => {
                        const roll = randomUtils().getRandomNumber({min: 1, max: DiceTypeValue[d]})

                        setDices([...(dices ?? []), {dice: d, roll: rules?.rollOnAdd ? roll : 0}])
                    }}/>
                </Grid>
            </Grid>
        </Grid>
        <Grid size={12} container>
            <Grid size={12}>
                <Typography variant={'caption'}>Dados adicionados</Typography>
            </Grid>
            <Grid size={12} container spacing={1}>
                {dices?.map((d, idx) => {
                    return <Grid size={{xs: 12, sm: 6, md: 3}}><Dice key={idx}
                                                                     diceType={d}
                                                                     reRoll={() => {
                                                                         const newDices = [...dices]
                                                                         newDices[idx] = {
                                                                             ...newDices[idx],
                                                                             roll: randomUtils().getRandomNumber({
                                                                                 min: 1,
                                                                                 max: DiceTypeValue[dices[idx].dice]
                                                                             })
                                                                         }
                                                                         setDices(newDices)
                                                                     }}
                                                                     onRemove={() => {
                                                                         const newDices = [...dices]
                                                                         newDices.splice(idx, 1)
                                                                         setDices(newDices)
                                                                     }}/></Grid>
                })}
            </Grid>
            <Grid size={12}>
                <Typography>Total: {rollCount}</Typography>
            </Grid>
        </Grid>
    </DefaultContainer>
}

