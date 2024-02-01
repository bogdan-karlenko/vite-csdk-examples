import { AreaChart } from "@sisense/sdk-ui"
import * as DM from '../../datamodels/sample-ecommerce'
import { measureFactory } from "@sisense/sdk-data"

const CodeExample = () => {
    return (
        <>
            <AreaChart
                dataSet={DM.DataSource}
                dataOptions={{
                    category: [DM.Commerce.Date.Quarters],
                    value: [
                        measureFactory.sum(DM.Commerce.Revenue, "Total Revenue")
                    ],
                    breakBy: [DM.Commerce.Condition]
                }}
                styleOptions={{
                    lineWidth: {width: 'thick'},
                    subtype: 'area/stackedspline',
                    yAxis: {enabled: true, labels: {enabled: false} },
                    xAxis: {title: {enabled: true, text: 'Date'}, intervalJumps: 3, isIntervalEnabled: true},
                    legend: {enabled: true, position: 'right'},
                    markers: {enabled: false, size: 'small', fill: 'hollow'}
                }}
            />
        </>
    )
}

export default CodeExample