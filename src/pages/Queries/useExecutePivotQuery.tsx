import { Table, useExecuteQuery, useExecutePivotQuery, ExecuteQueryParams, ExecutePivotQueryParams} from "@sisense/sdk-ui";
import * as DM from '../../datamodels/sample-ecommerce'
import { measureFactory, Sort } from "@sisense/sdk-data"

const CodeExample = () => {

    const queryProps:ExecuteQueryParams = {
        dataSource: DM.DataSource,
        dimensions: [
            DM.Commerce.Date.Years.sort(Sort.Descending),
            DM.Country.Country
        ],
        measures: [measureFactory.count(DM.Commerce.Revenue, "Revenue").sort(Sort.Descending)],
    }

    const pivotQueryProps:ExecutePivotQueryParams = {
        dataSource: DM.DataSource,
        rows: [
            {
                attribute: DM.Commerce.Date.Years.sort(Sort.None),
                includeSubTotals: true
            },
            {
                attribute: DM.Commerce.Condition,
                includeSubTotals: false
            }
        ],
        //columns: [DM.Country.Country],
        values: [measureFactory.count(DM.Commerce.Revenue, "Revenue").sort(Sort.Descending)],
        grandTotals: {
            rows: true
        }
    }

    // const { data, isLoading, isError } = useExecuteQuery(
    //     queryProps
    // );

    const { data:pivotData, isLoading: isPivotLoading, isError: isPivotError } = useExecutePivotQuery(
        pivotQueryProps
    );

    pivotData && console.log(pivotData)


    return (
        <>
            {
                pivotData &&
                <>
                    <Table
                        // set the data for the table UI component to the query result
                        dataSet={pivotData.table}
                        // show all columns from the query result by binding them to dataOptions
                        dataOptions={{ columns: pivotData.table.columns }}
                        styleOptions={{ headersColor: true, rowsPerPage: 16 }}
                    />
                </>

            }
        </>
    )

}

export default CodeExample