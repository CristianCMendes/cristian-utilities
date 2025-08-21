export const index = ''
export const sorteioAleatorio = 'sorteio-aleatorio'
export const geradorSenhas = 'gerador-senhas'
export const geradorQrCode = 'gerador-qr-code'
export const rolagemDados = 'rolagem-dados'
export const amigoSecreto = 'amigo-secreto'
export const amigoSecretoMeus = amigoSecreto + 'meus'

export const ROUTES = {
    index,
    sorteioAleatorio,
    geradorSenhas,
    geradorQrCode,
    rolagemDados,
    amigoSecreto,
    amigoSecretoMeus,
}

export type ROUTES_KEYS = keyof typeof ROUTES
export const routeAsPath = (route: ROUTES_KEYS) => `/${ROUTES[route]}`