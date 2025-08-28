import {DefaultContainer} from "@shared/DefaultContainer.tsx";
import {Button, Grid, Link, TextField} from "@mui/material";
import {useEffect, useMemo, useRef, useState} from "react";
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
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const location = useLocation()

    const [mode, setMode] = useState<mode>('login')
    const [data, setData] = useState<{ name: string, email: string, password: string, passwordConfirm: string }>({
        name: '',
        password: '',
        passwordConfirm: '',
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
                setIsLoading(true)
                register({email: email as mailType, password, name: data.name}).then((x) => {
                    const {data} = x

                    if (data != null && !data.isEmailConfirmed) {
                        addPopup({
                            title: 'Confirmação de conta',
                            content: <ConfirmAccountComponent email={data?.email as mailType || email as mailType}
                                                              userData={data}/>
                        })
                    }
                }).finally(() => {
                    setIsLoading(false)
                })
                return
            }
            setIsLoading(true)
            login({email: email as mailType, password}).finally(() => {
                setIsLoading(false)
            })
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
    const refs = {
        'name': useRef<HTMLInputElement>(null),
        'email': useRef<HTMLInputElement>(null),
        'password': useRef<HTMLInputElement>(null),
        'passwordconfirm': useRef<HTMLInputElement>(null)
    }
    return (<DefaultContainer title={{login: 'Login', register: 'Criando conta'}[mode]}
                              justifySelf={'center'}
                              maxWidth={600} rowSpacing={1}>
        <Grid size={12} component={'form'} onSubmit={(e) => {
            e.preventDefault()
            handleLogin()
        }}>
            {mode == 'register' &&
                <TextField name={'name'}
                           required
                           inputRef={(r: HTMLInputElement) => {
                               if (r != null) {
                                   refs.name.current = r
                               }
                           }}
                           value={data.name}
                           onKeyDown={(e) => {
                               if (e.key == 'Enter') {
                                   refs.email.current?.focus()
                               }
                           }}
                           enterKeyHint={'next'}
                           onChange={e => setData({...data, name: e.target.value})}
                           label={'Nome'}/>}
            <TextField type={'email'}
                       required
                       name={'mail'}
                       error={!mailValid}
                       inputRef={(r: HTMLInputElement) => {
                           if (r != null) {
                               refs.email.current = r
                           }
                       }}
                       onKeyDown={(e) => {
                           if (e.key == 'Enter') {
                               if (mailValid)
                                   refs.password.current?.focus()
                           }
                       }}
                       value={email}
                       onChange={e => setMail(e.target.value)}
                       enterKeyHint={'next'}
                       label={'Email'}/>
            <TextField type={'password'}
                       required
                       name={'password'}
                       value={password}
                       inputRef={(r: HTMLInputElement) => {
                           if (r != null) {
                               refs.password.current = r
                           }
                       }}
                       onKeyDown={(e) => {
                           if (e.key == 'Enter') {
                               if (mode == 'register') {
                                   refs.passwordconfirm.current?.focus()
                               } else {
                                   handleLogin()
                               }
                           }
                       }}
                       onChange={e => setPassword(e.target.value)}
                       enterKeyHint={'next'}
                       label={'Senha'}/>
            {mode == 'register' &&
                <TextField type={'password'}
                           required
                           inputRef={(r: HTMLInputElement) => {
                               if (r != null) {
                                   refs.passwordconfirm.current = r
                               }
                           }}
                           error={data.passwordConfirm != data.password}
                           name={'passwordConfirm'}
                           value={data.passwordConfirm}
                           enterKeyHint={'send'}
                           onChange={e => setData({...data, passwordConfirm: e.target.value})}
                           label={'Confirmar senha'}/>}
        </Grid>
        <Grid size={12} justifyContent={'space-between'} container>
            <Link href={'#'} onClick={() => {
                addPopup({
                    title: 'Tenho o codigo e preciso ativar minha conta',
                    content: <ConfirmAccountComponent email={data.email as mailType ?? null}/>
                })
            }}>Preciso ativar minha conta</Link>
            <Link {...CurrLinkProps} href={'#'}/>
        </Grid>
        <Grid size={12}>
            <Button loading={isLoading}
                    variant={'contained'}
                    onClick={handleLogin}
                    disabled={!allValid}
                    fullWidth>Login</Button>
        </Grid>
    </DefaultContainer>)
}