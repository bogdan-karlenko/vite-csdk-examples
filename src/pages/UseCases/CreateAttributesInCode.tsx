import { BarChart } from "@sisense/sdk-ui"
import { createAttribute, measureFactory } from "@sisense/sdk-data"

const CodeExample = () => {
    return (
        <>
            <BarChart
                dataSet={"Sample ECommerce"}
                dataOptions={{
                    category: [
                        createAttribute({
                            name: 'Years',
                            expression: '[Commerce.Date]',
                            granularity: "Years",
                            format: 'yyyy'
                        })
                    ],
                    value: [
                        measureFactory.sum(
                            createAttribute({
                                name: 'Total Revenue',
                                expression: '[Commerce.Revenue]',
                            })),
                    ],
                    breakBy: []
                }}
            />
        </>
    )
}

export default CodeExample

