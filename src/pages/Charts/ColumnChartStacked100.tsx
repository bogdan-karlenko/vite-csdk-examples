import { ColumnChart } from "@sisense/sdk-ui"
import * as DM from '../../datamodels/sample-ecommerce'
import { measureFactory } from "@sisense/sdk-data"

const CodeExample = () => {
    return (
        <>
            <ColumnChart
                dataSet={DM.DataSource}
                dataOptions={{
                    category: [DM.Commerce.Date.Years],
                    value: [
                        measureFactory.sum(DM.Commerce.Revenue, "Total Revenue")
                    ],
                    breakBy: [DM.Commerce.AgeRange]
                }}
                styleOptions={{
                    subtype: 'column/stackedcolumn100'
                }}
            />
        </>
    )
}

export default CodeExample