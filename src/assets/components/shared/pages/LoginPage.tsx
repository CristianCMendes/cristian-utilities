import {DefaultContainer} from "@shared/DefaultContainer.tsx";
import {Button, Grid, Link, TextField} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import {useAuth} from "@assets/context/api/useAuth.ts";
import type {mailType} from "@assets/models/shared/mailType.ts";
import {useLocation} from "react-router-dom";
import {usePopup} from "@assets/context/popup/usePopup.ts";
import {ConfirmAccountComponent} from "@components/user/account/ConfirmAccountComponent.tsx";
import {isMail} from "@utils/string.ts";
import {usePages} from "@hooks/usePages.ts";

type mode = 'login' | 'register'

// note: using the same element fot both to keep email and password in the same place
export function LoginPage() {
    const {login, user, register} = useAuth()
    const {getTab, setTab, navigate} = usePages()
    const {addPopup} = usePopup()

    const location = useLocation()

    const [mode, setMode] = useState<mode>('login')
    const [data, setData] = useState<{ name: string, email: string, password: string, passwordConfirm: string }>({
        name: '',
        password: 'notepad1',
        passwordConfirm: 'notepad1',
        email: '',
    });
    const setMail = (v: string) => setData({...data, email: v})
    const setPassword = (v: string) => setData({...data, password: v})

    const {email, password} = data

    const mailValid = useMemo(() => {
        return isMail(email)
    }, [email])

    const passwordValid = useMemo(() => {
        return password.length > 6
    }, [password])

    const nameValid = useMemo(() => {
        return data.name.length > 3 || mode == 'login'
    }, [data.name])

    const allValid = mailValid && passwordValid && nameValid

    useEffect(() => {
        const currTab = getTab<mode>("login")
        setMode(currTab ?? 'login')

    }, [location.search]);

    const handleLogin = () => {
        if (allValid) {
            if (mode == 'register') {
                register({email: email as mailType, password, name: data.name}).then((x) => {
                    const {data} = x
                    addPopup({
                        title: 'Confirmação de conta',
                        content: <ConfirmAccountComponent email={data?.email as mailType || email as mailType}
                                                          userData={data}/>
                    })
                })
                return
            }
            login({email: email as mailType, password})
        }
    }


    const CurrLinkProps = useMemo(() => {
        return {
            onClick: () => {
                setTab("login", mode == 'login' ? 'register' : 'login')
            },
            children: {login: 'Não tenho uma conta', register: 'Já tenho uma conta'}[mode]
        }
    }, [mode])

    if (user != null) (
        navigate({
            to: {
                pathname: "index"
            }
        })
    )

    return (<DefaultContainer title={{login: 'Login', register: 'Criando conta'}[mode]}
                              justifySelf={'center'}
                              maxWidth={600} rowSpacing={1}>
        <Grid size={12}>
            {mode == 'register' &&
                <TextField name={'name'} value={data.name}
                           onChange={e => setData({...data, name: e.target.value})}
                           label={'Nome'}/>}
            <TextField type={'email'} name={'mail'} value={email} onChange={e => setMail(e.target.value)}
                       label={'Email'}/>
            <TextField type={'password'} name={'password'} value={password} onChange={e => setPassword(e.target.value)}
                       label={'Senha'}/>
            {mode == 'register' &&
                <TextField type={'password'}
                           error={data.passwordConfirm != data.password}
                           name={'passwordConfirm'}
                           value={data.passwordConfirm}
                           onChange={e => setData({...data, passwordConfirm: e.target.value})}
                           label={'Confirmar senha'}/>}
        </Grid>
        <Grid size={12} justifyContent={'end'} container>
            <Link {...CurrLinkProps}/>
        </Grid>
        <Grid size={12}>
            <Button variant={'contained'} onClick={handleLogin} disabled={!allValid} fullWidth>Login</Button>
        </Grid>
    </DefaultContainer>)
}