import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material"
import DashboardCard from "./CardComponents/DashboardCard"
import { Chart, MemberFilterTile, ScattermapChart } from "@sisense/sdk-ui"
import * as DM from '../../datamodels/sample-ecommerce'
import { measureFactory, Filter } from "@sisense/sdk-data"
import { useState } from "react"


const CodeExample = () => {

    const [filterAgeRange, setFilterAgeRange] = useState<Filter | null>(null)

    const activeFilters: Filter[] = [filterAgeRange]
        .filter((f) => {
            // make sure no filters are undefined
            if (f) return f
        }) as Filter[]

    return (
        <>
            <Grid container spacing={2} rowSpacing={2}>
                <DashboardCard title="Filters" gridColumns={12} >
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-simple-select-label">Age Range</InputLabel>
                                <Select>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <MemberFilterTile
                                title="Age Range"
                                attribute={DM.Commerce.AgeRange}
                                filter={filterAgeRange}
                                onChange={setFilterAgeRange}
                            />
                        </Grid>
                    </Grid>
                </DashboardCard>
                <DashboardCard title="Revenue Trend" gridColumns={4} height={320}>
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
                        filters={activeFilters}
                        styleOptions={{
                            subtype: "area/spline",
                            xAxis: {
                                enabled: false
                            }
                        }}
                    />
                </DashboardCard>
                <DashboardCard title="Age Demographics" gridColumns={4} height={320}>
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
                        filters={activeFilters}
                        styleOptions={{
                            legend: { enabled: false },
                            subtype: 'pie/ring'
                        }}
                    />
                </DashboardCard>
                <DashboardCard title="Buyer Analysis" gridColumns={4} height={320}>
                    <Chart
                        dataSet={DM.DataSource}
                        chartType="scatter"
                        dataOptions={{
                            x: measureFactory.sum(DM.Commerce.Revenue),
                            y: measureFactory.countDistinct(DM.Commerce.VisitID),
                            breakByPoint: DM.Commerce.Condition,
                            breakByColor: DM.Commerce.AgeRange,
                        }}
                        filters={activeFilters}
                    />
                </DashboardCard>
                <DashboardCard title="Site Popularity" gridColumns={6} height={320}>
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
                        filters={activeFilters}
                        styleOptions={{
                            subtype: "line/spline",
                            xAxis: {
                                enabled: false
                            }
                        }}
                    />
                </DashboardCard>
                <DashboardCard title="Geography" gridColumns={6} height={320}>
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
                        filters={activeFilters}
                    />
                </DashboardCard>
            </Grid>
        </>
    )
}

export default CodeExample  