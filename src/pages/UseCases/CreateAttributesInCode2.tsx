import { PieChart } from "@sisense/sdk-ui"
import { createAttribute, measureFactory } from "@sisense/sdk-data"

const CodeExample = () => {
    return (
        <>
            <PieChart
                dataSet={"Sample ECommerce"}
                dataOptions={{
                    category: [
                        createAttribute({
                            name: 'Age Range',
                            expression: '[Commerce.Age Range]',
                        })
                    ],
                    value: [
                        measureFactory.sum(
                            createAttribute({
                                name: 'Total Revenue',
                                expression: '[Commerce.Revenue]',
                            })),
                    ],
                }}
            />
        </>
    )
}

export default CodeExample

