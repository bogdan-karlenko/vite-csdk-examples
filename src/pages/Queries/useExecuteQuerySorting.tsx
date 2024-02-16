import { Chart, Table, useExecuteQuery } from "@sisense/sdk-ui";
import * as DM from '../../datamodels/sample-ecommerce'
import { measureFactory, Sort } from "@sisense/sdk-data"

const CodeExample = () => {

    const queryProps = {
        dataSource: DM.DataSource,
        dimensions: [
            DM.Commerce.Date.Years.sort(Sort.Descending),
            DM.Country.Country
        ],
        measures: [measureFactory.count(DM.Commerce.Revenue, "Revenue").sort(Sort.Descending)],
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
                </>

            }
        </>
    )

}

export default CodeExample