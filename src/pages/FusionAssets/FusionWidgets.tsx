import { DashboardWidget } from "@sisense/sdk-ui"
import * as DM from '../../datamodels/sample-ecommerce'

const CodeExample = () => {
    return (
        <>
            <DashboardWidget
                dashboardOid="65a82171719e7f004018691c"
                widgetOid="65a82171719e7f0040186924"
                styleOptions={{
                    shadow: "Light",
                    spaceAround: "Medium",
                    height: 400
                }}
                drilldownOptions={{
                    drilldownDimensions: [
                        DM.Brand.Brand,
                        DM.Category.Category
                    ]
                }}
            />
            <DashboardWidget
                dashboardOid="65a82171719e7f004018691c"
                widgetOid="65a82171719e7f004018691f"
                styleOptions={{
                    shadow: "Light",
                    spaceAround: "Medium",
                    height: 400
                }}
                drilldownOptions={{
                    drilldownDimensions: [
                        DM.Brand.Brand,
                        DM.Category.Category
                    ]
                }}
            />
        </>
    )
}

export default CodeExample  