import { BoxplotChart } from "@sisense/sdk-ui"
import * as DM from '../../datamodels/sample-ecommerce'

const CodeExample = () => {
    return (
        <>
            <BoxplotChart
                dataSet={DM.DataSource}
                dataOptions={{
                    category: [DM.Commerce.Condition],
                    value: [{column: DM.Commerce.Cost, name: 'Total Cost'}],
                    boxType: 'iqr',
                    outliersEnabled: true,
                }}
            />
        </>
    )
}

export default CodeExample