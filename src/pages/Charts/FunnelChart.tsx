import { FunnelChart } from "@sisense/sdk-ui"
import * as DM from '../../datamodels/sample-ecommerce'
import { filterFactory, measureFactory } from "@sisense/sdk-data"

const CodeExample = () => {
    return (
        <>
            <FunnelChart
                dataSet={DM.DataSource}
                dataOptions={{
                    category: [DM.Commerce.AgeRange],
                    value: [
                        measureFactory.sum(DM.Commerce.Revenue, "Total Revenue")
                    ],
                }}
                styleOptions={{
                    funnelType:'pinched',
                    funnelSize: 'regular',
                    funnelDirection: 'regular'
                }}
            />
            {/* <FunnelChart
                dataSet={DM.DataSource}
                dataOptions={{
                    category: [],
                    value: [
                        measureFactory.countDistinct(DM.Commerce.VisitID, "Total Visits"),
                        measureFactory.measuredValue(
                            measureFactory.countDistinct(DM.Commerce.VisitID), 
                            [filterFactory.greaterThan(DM.Commerce.Revenue, 0)], 
                            "Visits that purchased"
                        )
                    ],
                }}
            /> */}
        </>
    )
}

export default CodeExample