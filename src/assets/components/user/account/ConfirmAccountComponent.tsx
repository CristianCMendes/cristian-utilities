import {Button, Grid, TextField} from "@mui/material";
import type {mailType} from "@assets/models/shared/mailType.ts";
import {useState} from "react";
import {toInt} from "@utils/numbers.ts";
import type {IUser, IUserAuth} from "@assets/models/entities/user/IUser.ts";
import {useAuth} from "@assets/context/api/useAuth.ts";
import {isMail} from "@utils/string.ts";
import {useToast} from "@hooks/useToast.ts";

interface ConfirmAccountComponentProps {
    email?: mailType,
    userData?: IUser,
    onConfirmed?: (data: IUserAuth) => void
}

export function ConfirmAccountComponent(props: ConfirmAccountComponentProps) {
    const {confirmMail} = useAuth()
    const {toastFromResponse} = useToast()
    const {userData} = props;
    const [data, setData] = useState<{ email: string, token?: number }>({email: props.email ?? ''})

    const mailValid = isMail(data.email)
    const tokenValid = data.token != null && data.token.toString().length == 6
    const allValid = mailValid && tokenValid

    const handleConfirm = () => {
        if (mailValid && tokenValid) {
            confirmMail({email: data.email as mailType, token: data.token!}).then((x) => {
                if (x.data != null)
                    props.onConfirmed?.(x.data)

                toastFromResponse(x)
            })
        }
    }

    return (<Grid size={12} container>
        <Grid size={12}>
            <TextField label={'Email'} value={data.email} disabled={userData != null}
                       error={!mailValid}
                       onChange={(e) => setData({...data, email: e.target.value})}/>
        </Grid>
        <Grid size={12}>
            <TextField label={'Token'} value={data.token}
                       error={!tokenValid}
                       onChange={(e) => setData({...data, token: toInt(e.target.value)})}/>
        </Grid>
        <Grid size={12}>
            <Button fullWidth variant={'outlined'} onClick={handleConfirm} disabled={!allValid}>Confirmar</Button>

        </Grid>

    </Grid>)
}