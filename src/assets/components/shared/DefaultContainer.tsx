import {Grid, Paper, Typography} from "@mui/material";
import * as React from "react";

interface DefaultContainerProps extends React.ComponentProps<typeof Grid> {
    title?: string,
    titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline',
    hideHeader?: boolean,
    component?: React.ElementType
}

export function DefaultContainer({
                                     hideHeader = false, title,
                                     children,
                                     p = 1.5,
                                     my = p,
                                     component = Paper,
                                     titleVariant = 'h6',
                                     size = 12,
                                     ...props
                                 }: DefaultContainerProps) {
    return (<Grid container {...props}
                  size={size}
                  component={component}>
            {!hideHeader && title != null &&
                <Grid size={12} my={my}>
                    <Typography variant={titleVariant} textAlign={'center'}>
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