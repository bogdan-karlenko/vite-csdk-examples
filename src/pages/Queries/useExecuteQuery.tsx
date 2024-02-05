import { Chart, Table, useExecuteQuery } from "@sisense/sdk-ui";
import * as DM from '../../datamodels/sample-ecommerce'
import { measureFactory } from "@sisense/sdk-data"

const CodeExample = () => {

    const queryProps = {
        // set the dataSource to the one within the imported DataModel (DM)
        dataSource: DM.DataSource,
        // specify one or more dimensions (grouping columns)
        dimensions: [
            DM.Commerce.Date.Years,
            DM.Country.Country
        ],
        // specify one or more measures (aggregation of columns)
        measures: [measureFactory.count(DM.Commerce.Revenue, "Revenue")],
    }

    const { data, isLoading, isError } = useExecuteQuery(
        queryProps
    );

    return (
        <>
            {
                data &&
                <>
                    <Table
                        // set the data for the table UI component to the query result
                        dataSet={data}
                        // show all columns from the query result by binding them to dataOptions
                        dataOptions={{ columns: data.columns }}
                        styleOptions={{ headersColor: true, rowsPerPage: 16 }}
                    />
                    <Chart
                        dataSet={data}
                        chartType="column"
                        dataOptions={{
                            category: [{ name: 'Years', type: 'datetime' }],
                            value: [{ name: 'Revenue' }],
                        }}
                    />
                </>

            }
        </>
    )

}

export default CodeExample