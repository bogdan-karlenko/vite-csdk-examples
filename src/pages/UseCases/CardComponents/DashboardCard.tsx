import { ReactNode } from "react"
import { Card, CardContent, CardHeader, Grid } from "@mui/material"

type DashboardCardProps = {
    title?: string,
    height?: number,
    gridColumns: number,
    children?: ReactNode
}

const DashboardCard = (props: DashboardCardProps) => {
    return (
        <>
            <Grid item xs={props.gridColumns}>
                <Card>
                    <CardHeader subheader={props.title || ''} sx={{ paddingTop: '8px', paddingBottom: '8px' }} />
                    <CardContent sx={{ height: props.height}}>
                        {props.children}
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}

export default DashboardCard