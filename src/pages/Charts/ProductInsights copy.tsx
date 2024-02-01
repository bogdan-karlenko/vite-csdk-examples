import { Card, CardContent, CardHeader, Grid } from "@mui/material"
import { Chart, ScattermapChart } from "@sisense/sdk-ui"
import * as DM from '../../datamodels/sample-ecommerce'
import { measureFactory } from "@sisense/sdk-data"

const CodeExample = () => {
    return (
        <>
            <Grid container spacing={2} rowSpacing={2}>
                <Grid item xs={4}>
                    <Card>
                        <CardHeader subheader="Revenue trend" sx={{ paddingTop: '8px', paddingBottom: '8px' }} />
                        <CardContent sx={{ height: '350px' }}>
                            <Chart
                                dataSet={DM.DataSource}
                                chartType="column"
                                dataOptions={{
                                    category: [DM.Commerce.Date.Quarters],
                                    value: [
                                        measureFactory.sum(DM.Commerce.Revenue, "Total Revenue"),
                                        {
                                            column: measureFactory.countDistinct(DM.Commerce.VisitID),
                                            showOnRightAxis: true,
                                            chartType: 'line',
                                            title: '# Visits'
                                        }
                                    ],
                                    breakBy: []
                                }}
                                styleOptions={{
                                    subtype: "area/spline",
                                    xAxis: {
                                        enabled: false
                                    }
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardHeader subheader="Age Demographics" sx={{ paddingTop: '8px', paddingBottom: '8px' }} />
                        <CardContent sx={{ height: '350px' }}>
                            <Chart
                                dataSet={DM.DataSource}
                                chartType="pie"
                                dataOptions={{
                                    category: [DM.Commerce.AgeRange],
                                    value: [
                                        measureFactory.sum(DM.Commerce.Revenue, "Total Revenue")
                                    ],
                                    breakBy: []
                                }}
                                styleOptions={{
                                    legend: { enabled: false },
                                    subtype: 'pie/ring'
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4} >
                    <Card>
                        <CardHeader subheader="Buyer Analysis" sx={{ paddingTop: '8px', paddingBottom: '8px' }} />
                        <CardContent sx={{ height: '350px' }}>
                            <Chart
                                dataSet={DM.DataSource}
                                chartType="scatter"
                                dataOptions={{
                                    x: measureFactory.sum(DM.Commerce.Revenue),
                                    y: measureFactory.countDistinct(DM.Commerce.VisitID),
                                    breakByPoint: DM.Commerce.Condition,
                                    breakByColor: DM.Commerce.AgeRange,
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} >
                    <Card>
                        <CardHeader subheader="Site Popularity" sx={{ paddingTop: '8px', paddingBottom: '8px' }} />
                        <CardContent sx={{ height: '400px' }}>
                            <Chart
                                dataSet={DM.DataSource}
                                chartType="line"
                                dataOptions={{
                                    category: [DM.Commerce.Date.Weeks],
                                    value: [
                                        measureFactory.countDistinct(DM.Commerce.VisitID, "Total Visits")
                                    ],
                                    breakBy: [],
                                }}
                                styleOptions={{
                                    subtype: "line/spline",
                                    xAxis: {
                                        enabled: false
                                    }
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} >
                    <Card>
                        <CardHeader subheader="Geography" sx={{ paddingTop: '8px', paddingBottom: '8px' }} />
                        <CardContent sx={{ height: '400px' }}>
                            <ScattermapChart
                                dataSet={DM.DataSource}
                                dataOptions={{
                                    geo: [DM.Country.Country],
                                    size: measureFactory.sum(DM.Commerce.Cost, 'Size by Cost'),
                                    colorBy: {
                                        column: measureFactory.sum(DM.Commerce.Revenue, 'Color by Revenue'),
                                        color: '#f72585'
                                    },
                                    details: DM.Category.Category,
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </>
    )

}

export default CodeExample  