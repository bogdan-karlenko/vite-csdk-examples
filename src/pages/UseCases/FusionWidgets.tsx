import { DashboardWidget } from "@sisense/sdk-ui"
import * as DM from '../../datamodels/sample-ecommerce'

const CodeExample = () => {
    return (
        <>
            <DashboardWidget
                dashboardOid="6161af2cddaad4002bed391e"
                widgetOid="6161bef6ddaad4002bed3953"
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
                dashboardOid="6161af2cddaad4002bed391e"
                widgetOid="6161bf6eddaad4002bed3958"
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