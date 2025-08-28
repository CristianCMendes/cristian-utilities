import {TextField} from "@mui/material";
import React, {type ChangeEvent, useEffect, useRef, useState} from "react";
import {toFloat, toMoney} from "@utils/numbers.ts";

interface MoneyFieldProps extends Omit<React.ComponentProps<typeof TextField>, 'value' | 'onChange'> {
    value?: number;
    onChange?: (value: number) => void;
}


export function MoneyField(props: MoneyFieldProps) {
    const {value, onChange, ...rest} = props;

    const [displayValue, setDisplayValue] = useState("")
    const [tempValue, setTempValue] = useState(0)
    const [focused, setFocused] = useState(false)

    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setDisplayValue(toMoney(value ?? 0))
    }, [value]);

    useEffect(() => {
        if (!focused && ref.current != null) {
            ref.current.blur()
        }
    }, [focused]);

    const focusedProps: Partial<React.ComponentProps<typeof TextField>> = {
        value: tempValue, onChange: (e: ChangeEvent<HTMLInputElement>) => {
            setTempValue(toFloat(e.target.value))
        },
        onKeyDown: (e) => {
            if (e.key === 'Enter') {
                setDisplayValue(toMoney(tempValue))
                onChange?.(tempValue)
                setFocused(false)
            }

            if (e.key == 'ArrowUp') {
                setTempValue(tempValue + 1)
                e.preventDefault()
            }
            if (e.key == 'ArrowDown') {
                setTempValue(tempValue - 1)
                e.preventDefault()
            }
        },
        onBlur: () => {
            setDisplayValue(toMoney(tempValue))
            onChange?.(tempValue)
            setFocused(false)
        }
    }

    const unfocusedProps: Partial<React.ComponentProps<typeof TextField>> = {
        value: displayValue,
        onFocus: () => {
            setFocused(true)
        }
    }

    const propsToUse = focused ? focusedProps : unfocusedProps

    return (<TextField ref={ref} type={'text'} onFocus={() => setFocused(true)} {...rest} {...propsToUse}/>)
}