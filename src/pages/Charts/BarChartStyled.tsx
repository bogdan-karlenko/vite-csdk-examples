import { BarChart, LegendPosition, StackableSubtype } from "@sisense/sdk-ui"
import * as DM from '../../datamodels/sample-ecommerce'
import { measureFactory } from "@sisense/sdk-data"
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useState } from "react"

const CodeExample = () => {

    const [chartSubType, setChartSubType] = useState<StackableSubtype | undefined>('bar/classic')
    const [seriesLabels, setSeriesLabels] = useState(true)
    const [seriesLabelsRotation, setSeriesLabelsRotation] = useState<number>(0)
    const [legendEnabled, setLegendEnabled] = useState(true)
    const [legendPosition, setLegendPosition] = useState<LegendPosition | undefined>('bottom')

    return (
        <>
            <Stack direction="row" spacing={4}>
                <h5>Chart Subtype</h5>
                <ToggleButtonGroup color="primary" size='small' exclusive value={chartSubType} onChange={(ev, val) => setChartSubType(val)}>
                    <ToggleButton value="bar/classic">bar/classic</ToggleButton>
                    <ToggleButton value="bar/stacked">bar/stacked</ToggleButton>
                    <ToggleButton value="bar/stacked100">bar/stacked100</ToggleButton>
                </ToggleButtonGroup>
                <h5>Series Labels</h5>
                <ToggleButtonGroup color="primary" size='small' value={seriesLabels} exclusive onChange={(ev, val) => setSeriesLabels(Boolean(val))}>
                    <ToggleButton value={true}>Series labels ON</ToggleButton>
                    <ToggleButton value={false}>Series labels OFF</ToggleButton>
                </ToggleButtonGroup>
                <h5>Series Labels Rotation</h5>
                <ToggleButtonGroup color="primary" size='small' exclusive value={seriesLabelsRotation.toString()} onChange={(ev, val) => setSeriesLabelsRotation(Number(val))}>
                    <ToggleButton value='0'>0</ToggleButton>
                    <ToggleButton value='20'>20</ToggleButton>
                    <ToggleButton value='45'>45</ToggleButton>
                </ToggleButtonGroup>
            </Stack>
            <br />
            <Stack direction="row" spacing={4}>
                <h5>Legend</h5>
                <ToggleButtonGroup color="primary" size='small' value={legendEnabled} exclusive onChange={(ev, val) => setLegendEnabled(Boolean(val))}>
                    <ToggleButton value={true}>Legend ON</ToggleButton>
                    <ToggleButton value={false}>Legend OFF</ToggleButton>
                </ToggleButtonGroup>
                <h5>Legend position</h5>
                <ToggleButtonGroup color="primary" size='small' exclusive value={legendPosition} onChange={(ev, val) => setLegendPosition(val)}>
                    <ToggleButton value="bottom">bottom</ToggleButton>
                    <ToggleButton value="left">left</ToggleButton>
                    <ToggleButton value="top">top</ToggleButton>
                    <ToggleButton value="right">right</ToggleButton>
                </ToggleButtonGroup>
            </Stack>
            <br />
            <BarChart
                dataSet={DM.DataSource}
                dataOptions={{
                    category: [DM.Commerce.Date.Years],
                    value: [
                        measureFactory.sum(DM.Commerce.Revenue, "Total Revenue")
                    ],
                    breakBy: [DM.Commerce.AgeRange]
                }}
                styleOptions={{
                    subtype: chartSubType,
                    legend: { enabled: legendEnabled, position: legendPosition },
                    seriesLabels: { enabled: seriesLabels, rotation: seriesLabelsRotation },
                    //markers: { enabled: true },
                    height: 600
                }}
            />
        </>
    )
}

export default CodeExample