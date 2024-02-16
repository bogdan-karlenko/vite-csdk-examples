// import { Chart, Table, useExecuteQuery } from "@sisense/sdk-ui";
// import * as DM from '../../datamodels/sample-ecommerce'
// import { measureFactory } from "@sisense/sdk-data"
import { ChatApiContextProvider, Chatbot } from "@sisense/sdk-ui/ai";

const CodeExample = () => {

    return (
        <>
            <ChatApiContextProvider>
                <Chatbot />
            </ChatApiContextProvider>
        </>
    )

}

export default CodeExample