import {Route, Routes} from "react-router-dom";
import {AppLayout} from "@shared/AppLayout.tsx";
import {HomePage} from "@shared/pages/HomePage.tsx";
import {SorteioAleatorioPage} from "@components/random/pages/SorteioAleatorioPage.tsx";
import {PwdGenPage} from "@components/random/pages/PwdGenPage.tsx";
import {DiceRollPage} from "@components/random/pages/DiceRollPage.tsx";
import {LoginPage} from "@shared/pages/LoginPage.tsx";
import {ROUTES} from "@routes/appRoutes.ts";
import {SecretFriendIndexPage} from "@components/secretFriend/pages/SecretFriendIndexPage.tsx";

export function AppRoutes() {
    return (<Routes>
        <Route path="*" element={<AppLayout/>} children={[
            <Route path={''} element={<HomePage/>}/>,
            <Route path={ROUTES.sorteioAleatorio} element={<SorteioAleatorioPage/>}/>,
            <Route path={ROUTES.geradorSenhas} element={<PwdGenPage/>}/>,
            <Route path={ROUTES.rolagemDados} element={<DiceRollPage/>}/>,
            <Route path={ROUTES.login} element={<LoginPage/>}/>,
            <Route path={ROUTES.amigoSecreto} element={<SecretFriendIndexPage/>}/>,
        ]}/>
    </Routes>)
}