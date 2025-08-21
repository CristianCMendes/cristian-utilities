import {type GridProps, Sheet, Typography} from "@mui/joy";
import Grid from "@mui/joy/Grid";

interface DefaultContainerProps extends GridProps {
    title?: string,
    hideHeader?: boolean,
}

export function DefaultContainer({
                                     hideHeader = false, title,
                                     component = Sheet,
                                     children,
                                     p = 1.5,
                                     my = p,
                                     ...props
                                 }: DefaultContainerProps) {
    return (<Grid container {...props} component={component}>
            {!hideHeader &&
                <Grid component={Sheet} xs={12} my={my}>
                    <Typography level={'title-lg'} textAlign={'center'}>
                        {title}
                    </Typography>
                </Grid>
            }
            <Grid p={p}>
                {children}
            </Grid>
        </Grid>
    )
}