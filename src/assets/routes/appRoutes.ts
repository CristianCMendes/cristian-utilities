export const ROUTES = {
    index: '',
    sorteioAleatorio: 'sorteio-aleatorio',
    geradorSenhas: 'gerador-senhas',
    geradorQrCode: 'gerador-qr-code',
    rolagemDados: 'rolagem-dados',
    amigoSecreto: 'amigo-secreto',
    login: 'login',
}

export type ROUTES_KEYS = keyof typeof ROUTES
export const routeAsPath = (route: ROUTES_KEYS) => `/${ROUTES[route]}`