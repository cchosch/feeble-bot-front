import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";

function makeRoute(p: string, el: JSX.Element): RouteObject {
    return {path: p, element: el};
}

export const router = createBrowserRouter([
    makeRoute("/", <Home/>)
]);

function FBotRouter() {
    return <RouterProvider router={router}/>;
}

export default FBotRouter;
