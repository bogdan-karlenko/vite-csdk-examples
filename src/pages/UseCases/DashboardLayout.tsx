import { Grid } from "@mui/material"
import DashboardCard from "./CardComponents/DashboardCard"
import { Chart, ScattermapChart } from "@sisense/sdk-ui"
import * as DM from '../../datamodels/sample-ecommerce'
import { measureFactory } from "@sisense/sdk-data"


const CodeExample = () => {
    return (
        <>
            <Grid container spacing={2} rowSpacing={2}>
                <DashboardCard title="Revenue Trend" gridColumns={4}>
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
                </DashboardCard>
                <DashboardCard title="Age Demographics" gridColumns={4}>
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
                </DashboardCard>
                <DashboardCard title="Buyer Analysis" gridColumns={4}>
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
                </DashboardCard>
                <DashboardCard title="Site Popularity" gridColumns={6}>
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
                </DashboardCard>
                <DashboardCard title="Geography" gridColumns={6}>
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
                </DashboardCard>
            </Grid>
        </>
    )
}

export default CodeExample  