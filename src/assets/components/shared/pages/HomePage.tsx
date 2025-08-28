import {Button, Grid} from "@mui/material";
import {useApi} from "@assets/context/api/useApi.ts";
import {API_ROUTES} from "@routes/apiRoutes.ts";

export function HomePage() {
    const {request} = useApi()


    const t = () => {
        request(API_ROUTES.users.list({
            pagination: {
                page: 1,
                pageSize: 10,
            }
        })).then(() => {

        })
    }

    return (<Grid>
        <Button onClick={t}>Testar</Button>
        TESTE
    </Grid>)
}