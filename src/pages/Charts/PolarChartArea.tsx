import { PolarChart } from "@sisense/sdk-ui"
import * as DM from '../../datamodels/sample-ecommerce'
import { measureFactory } from "@sisense/sdk-data"

const CodeExample = () => {
    return (
        <>
            <PolarChart
                dataSet={DM.DataSource}
                dataOptions={{
                    category: [DM.Commerce.AgeRange],
                    value: [
                        measureFactory.sum(DM.Commerce.Revenue, "Total Revenue")
                    ],
                    breakBy: []
                }}
                styleOptions={{
                    subtype: 'polar/area'
                }}
            />
        </>
    )
}

export default CodeExample