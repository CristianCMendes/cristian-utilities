import {Chip, IconButton, Tooltip} from "@mui/material";
import type {Dayjs} from "dayjs";
import {useEffect, useMemo, useState, memo} from "react";
import {ArrowLeft, ArrowRight} from "@mui/icons-material";

interface SorteioComponentProps {
    value: number | string,
    datetime: Dayjs,
    expanded?: boolean,
}

export const SorteioComponent = memo(function SorteioComponent({value, datetime, expanded = false}: SorteioComponentProps) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(expanded ?? false)
    }, [expanded]);

    const formatedDate = useMemo(() => {
        return datetime.format("DD/MM/YYYY HH:mm:ss")
    }, [datetime])

    const displayValue = useMemo(() => {

        if (!open) {
            return value
        }
        return `${value} - ${formatedDate}`

    }, [open])

    const ExpandIcon = () => {
        return <IconButton size={'small'} onClick={() => {
            setOpen(!open)
        }}> {open ? <ArrowLeft/> : <ArrowRight/>}</IconButton>
    }


    return (
        <Tooltip title={formatedDate} enterDelay={600}>
            <Chip label={displayValue} onDelete={() => {
            }} deleteIcon={<ExpandIcon/>}/>
        </Tooltip>
    )
});