import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Chart, ChartProps, ChartType, useGetWidgetModel } from "@sisense/sdk-ui"
import { useState } from "react";

const CodeExample = () => {

    const { widget, isLoading, isError } = useGetWidgetModel({
        dashboardOid: '65a82171719e7f004018691c',
        widgetOid: '65a82171719e7f004018691f',
    });

    const [chartProps, setChartProps] = useState<ChartProps>()

    if (widget && !chartProps) setChartProps(widget.getChartProps())

    const changeChartType = (value: ChartType) => {
        if (value && chartProps) {
            setChartProps({ ...chartProps, chartType: value })
        }
    }

    return (
        chartProps &&
        <>
            <Stack direction="row" spacing={4}>
                <h5>Chart Type</h5>
                <ToggleButtonGroup color="primary" size='small' exclusive value={chartProps.chartType} onChange={(event, value) => changeChartType(value)}>
                    <ToggleButton value="bar">Bar</ToggleButton>
                    <ToggleButton value="column">Column</ToggleButton>
                    <ToggleButton value="pie">Pie</ToggleButton>
                    <ToggleButton value="line">Line</ToggleButton>
                    <ToggleButton value="area">Area</ToggleButton>
                    <ToggleButton value="polar">Polar</ToggleButton>
                    <ToggleButton value="funnel">Funnel</ToggleButton>
                    <ToggleButton value="treemap">Treemap</ToggleButton>
                    <ToggleButton value="sunburst">Sunburst</ToggleButton>
                </ToggleButtonGroup>
            </Stack>
            <Chart
                chartType={chartProps.chartType}
                dataSet={chartProps.dataSet}
                filters={chartProps.filters}
                highlights={chartProps.highlights}
                styleOptions={chartProps.styleOptions}
                dataOptions={chartProps.dataOptions}
            />
        </>
    )
}


export default CodeExample