import { IndicatorChart } from "@sisense/sdk-ui"
import * as DM from '../../datamodels/sample-ecommerce'
import { measureFactory } from "@sisense/sdk-data"

const CodeExample = () => {
    return (
        <>
            <IndicatorChart
                dataSet={DM.DataSource}
                dataOptions={{
                    value: [
                        measureFactory.sum(DM.Commerce.Revenue, "Total Revenue")
                    ],
                }}
            />

            <IndicatorChart
                dataSet={DM.DataSource}
                dataOptions={{
                    value: [
                        measureFactory.sum(DM.Commerce.Revenue, "Total Revenue")
                    ],
                    max: [measureFactory.constant(125000000)]
                }}
                styleOptions={{
                    indicatorComponents: {
                        title: {
                            shouldBeShown: true,
                            text: 'Total Revenue',
                        },
                        ticks: {
                            shouldBeShown: false,
                        },
                        labels: {
                            shouldBeShown: true,
                        },
                    },
                    subtype: 'indicator/gauge',
                    skin: 2,
                }}
            />

            <IndicatorChart
                dataSet={DM.DataSource}
                dataOptions={{
                    value: [
                        measureFactory.sum(DM.Commerce.Revenue, "Total Revenue")
                    ],
                    max: [measureFactory.constant(125000000)]
                }}
                styleOptions={{
                    indicatorComponents: {
                        title: {
                            shouldBeShown: true,
                            text: 'Total Revenue',
                        },
                        ticks: {
                            shouldBeShown: false,
                        },
                        labels: {
                            shouldBeShown: true,
                        },
                    },
                    subtype: 'indicator/gauge',
                    skin: 2,
                    forceTickerView: true,
                    tickerBarHeight: 30,
                    width: 400
                }}
            />
        </>
    )
}

export default CodeExample