import { LineChart } from "@sisense/sdk-ui"
import * as DM from '../../datamodels/sample-ecommerce'
import { measureFactory } from "@sisense/sdk-data"

const CodeExample = () => {
    return (
        <>
            <LineChart
                dataSet={DM.DataSource}
                dataOptions={{
                    category: [DM.Commerce.Date.Quarters],
                    value: [
                        measureFactory.sum(DM.Commerce.Revenue, "Total Revenue")
                    ],
                    breakBy: [DM.Commerce.Condition]
                }}
                styleOptions={{
                    lineWidth: {width: 'bold'},
                    subtype: 'line/spline'
                }}
            />
        </>
    )
}

export default CodeExample