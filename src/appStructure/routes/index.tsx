import { RouteObject, useRoutes } from "react-router-dom";
import pages from "../pageMenu/generatePagesCollection";
import { ComponentPage, ComponentPageList } from "../menuTypes";
import React, { Suspense, useState } from "react";
import ContentPage from "../contentPage";

import { Sandpack } from "@codesandbox/sandpack-react";
import { githubLight } from "@codesandbox/sandpack-themes";

const loading = () => <div className=""></div>;

type LoadComponentProps = {
    folderName?: string,
    pageCaption: string,
    component: React.LazyExoticComponent<() => JSX.Element>;
    filePath: string
};

const LoadComponent = ({ pageCaption, component: Component, filePath }: LoadComponentProps) => {

    async function LoadRawFile(filename: string): Promise<string> {
        filename += '?raw'
        const file: any = await import(/* @vite-ignore */`${filename}`)
        console.log(file.default)
        return file.default
    }

    const [fileContents, setFileContents] = useState<string>('')
    LoadRawFile(filePath).then(
        (value: string) => setFileContents(value)
    )

    console.log(fileContents)

    return (
        <Suspense fallback={loading()}>
            <ContentPage
                childComponent={
                    <>
                        {pageCaption && <h2>{pageCaption}</h2>}
                        <Component />
                    </>
                }
            />

            <ContentPage
                childComponent={
                    <Sandpack
                        template="react-ts"
                        theme={githubLight}
                        options={{
                            editorHeight: "600px",
                            //externalResources: ["../../datamodels/sample-ecommerce"]
                        }}
                        customSetup={{
                            dependencies: {
                                '@sisense/sdk-data': 'latest',
                                '@sisense/sdk-ui': 'latest',
                                //'../../datamodels/sample-ecommerce': 'latest'
                            },
                        }}
                        files={{
                            "/App.tsx": fileContents,
                            'index.tsx': `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { SisenseContextProvider, ThemeProvider } from "@sisense/sdk-ui";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <SisenseContextProvider
      url="https://public-compose-sdk.sisense.com/"
      token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjVjZGVjZGNjMzEzNzUwMDJkYjU2NzQ1IiwiYXBpU2VjcmV0IjoiMmUwMTI4YmQtMjIzYS1iNTQwLTA0ZGItN2FlYWMwOTUzMjY5IiwiYWxsb3dlZFRlbmFudHMiOlsiNjRkNGY0Y2E0ZTRlNmYwMDFiMzRlODQwIl0sInRlbmFudElkIjoiNjRkNGY0Y2E0ZTRlNmYwMDFiMzRlODQwIn0.oe58wxjzyMWcFmYizL_hj42Ome1ZLxzx9jQCtcvlLPA"
    >
    <ThemeProvider
    theme={{
      typography: {
        fontFamily: 'Verdana'
      },
      palette: {
        variantColors: ['#4361ee', '#f72585', '#7209b7', '#4cc9f0', '#3a0ca3',]
      },
      general: {
        brandColor: '#FFB9D7'
      }
    }
    }>

    <App />

  </ThemeProvider>
      
    </SisenseContextProvider>
  </StrictMode>
);`,
                        }}
                    />
                }
            />

        </Suspense>
    )
};

const RouteChildren = ({ pages, folderName }: { pages: ComponentPage[], folderName: string }) => {
    let routeObjects: RouteObject[] = pages.map((page) => {
        let ro: RouteObject = {
            path: `/${folderName}/${page.menuCaption}`,
            element: <LoadComponent
                pageCaption={page.menuCaption}
                component={React.lazy(() => import(/* @vite-ignore */`../../pages/${folderName}/${page.fileName}`))}
                filePath={`../../pages/${folderName}/${page.fileName}`}
            />
        }
        return (
            ro
        )
    })

    return (
        routeObjects
    )
}

const RouteSection = ({ collection }: { collection: ComponentPageList }) => {
    return (
        {
            path: `/${collection.folderName}`,
            children: RouteChildren({ pages: collection.components, folderName: collection.folderName })
        }
    )
}

const dynamicRouteList: RouteObject[] = pages.map((collection) => {
    return (
        RouteSection({ collection: collection })

    )
})

const AllRoutes = () => {
    dynamicRouteList.push({ path: "/", element: <LoadComponent pageCaption='Home' component={React.lazy(() => import(/* @vite-ignore */`../../pages/Home`))} /> })
    dynamicRouteList.push({ path: "/Home", element: <LoadComponent pageCaption='Home' component={React.lazy(() => import(/* @vite-ignore */`../../pages/Home`))} /> })
    return useRoutes(
        dynamicRouteList
    );
};

export default AllRoutes