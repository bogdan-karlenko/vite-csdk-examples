import { PieChart } from "@sisense/sdk-ui"
import * as DM from '../../datamodels/sample-ecommerce'
import { measureFactory } from "@sisense/sdk-data"

const CodeExample = () => {
    return (
        <>
            <PieChart
                dataSet={DM.DataSource}
                dataOptions={{
                    category: [DM.Commerce.AgeRange],
                    value: [
                        measureFactory.sum(DM.Commerce.Revenue, "Total Revenue")
                    ],
                }}
                styleOptions={{
                    subtype: 'pie/donut'
                }}
            />
        </>
    )
}

export default CodeExample