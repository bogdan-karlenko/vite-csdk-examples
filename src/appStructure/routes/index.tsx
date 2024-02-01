import { RouteObject, useRoutes } from "react-router-dom";
import pages from "../pageMenu/generatePagesCollection";
import { ComponentPage, ComponentPageList } from "../menuTypes";
import React, { Suspense } from "react";
import ContentPage from "../contentPage";

const loading = () => <div className=""></div>;

type LoadComponentProps = {
    folderName?: string,
    pageCaption: string,
    component: React.LazyExoticComponent<() => JSX.Element>;
};

const LoadComponent = ({ pageCaption, component: Component }: LoadComponentProps) => (
    <Suspense fallback={loading()}>
        <ContentPage
            childComponent={
                <>
                    {pageCaption && <h2>{pageCaption}</h2>}
                    <Component />
                </>
            }
        />

    </Suspense>
);

const RouteChildren = ({ pages, folderName }: { pages: ComponentPage[], folderName: string }) => {
    let routeObjects: RouteObject[] = pages.map((page) => {
        let ro: RouteObject = {
            path: `/${folderName}/${page.menuCaption}`,
            element: <LoadComponent
                pageCaption={page.menuCaption}
                component={React.lazy(() => import(/* @vite-ignore */`../../pages/${folderName}/${page.fileName}`))}
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