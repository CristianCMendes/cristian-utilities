import {Route, Routes} from "react-router-dom";
import {AppLayout} from "@shared/AppLayout.tsx";
import {HomePage} from "@shared/pages/HomePage.tsx";
import {ROUTES} from "@utils/routeNames.ts";
import {SorteioAleatorioPage} from "@components/random/pages/SorteioAleatorioPage.tsx";
import {PwdGenPage} from "@components/random/pages/PwdGenPage.tsx";

export function AppRoutes() {
    return (<Routes>
        <Route path="*" element={<AppLayout/>} children={[
            <Route path={''} element={<HomePage/>}/>,
            <Route path={ROUTES.sorteioAleatorio} element={<SorteioAleatorioPage/>}/>,
            <Route path={ROUTES.geradorSenhas} element={<PwdGenPage/>}/>
        ]}/>
    </Routes>)
}