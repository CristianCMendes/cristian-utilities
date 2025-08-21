import {Route, Routes} from "react-router-dom";
import {AppHeader} from "../components/shared/AppHeader.tsx";
import {HomePage} from "../components/pages/HomePage.tsx";

export function AppRoutes() {
    return (<Routes>
        <Route path="*" element={<AppHeader/>} children={[
            <Route path={''} element={<HomePage/>}/>
        ]}/>
    </Routes>)
}