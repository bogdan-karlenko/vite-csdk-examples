import { Chart, ChartProps, useGetWidgetModel } from "@sisense/sdk-ui"
import { useState } from "react";

const CodeExample = () => {

    const { widget, isLoading, isError } = useGetWidgetModel({
        dashboardOid: '65a82171719e7f004018691c',
        widgetOid: '65a82171719e7f004018691f',
    });

    const [chartProps, setChartProps] = useState<ChartProps>()

    if (widget && !chartProps) setChartProps(widget.getChartProps())

    return (
        chartProps &&
        <>
            <Chart
                chartType={chartProps.chartType!}
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