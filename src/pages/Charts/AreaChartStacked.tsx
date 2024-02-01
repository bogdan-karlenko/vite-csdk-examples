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
                    subtype: 'area/stacked'
                }}
            />
        </>
    )
}

export default CodeExample