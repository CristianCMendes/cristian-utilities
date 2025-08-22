import {Grid, Paper, Typography} from "@mui/material";
import * as React from "react";

interface DefaultContainerProps extends React.ComponentProps<typeof Grid> {
    title?: string,
    hideHeader?: boolean,
    component?: React.ElementType
}

export function DefaultContainer({
                                     hideHeader = false, title,
                                     children,
                                     p = 1.5,
                                     my = p,
                                     component = Paper,
                                     ...props
                                 }: DefaultContainerProps) {
    return (<Grid container {...props}
                  component={component}>
            {!hideHeader &&
                <Grid size={12} my={my}>
                    <Typography variant={'h4'} textAlign={'center'}>
                        {title}
                    </Typography>
                </Grid>
            }
            <Grid p={p} container size={12}>
                {children}
            </Grid>
        </Grid>
    )
}