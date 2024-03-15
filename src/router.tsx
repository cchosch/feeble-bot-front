import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";

function makeRoute(p: string, el: JSX.Element): RouteObject {
    return {path: p, element: el};
}

export const router = createBrowserRouter([
    makeRoute("/", <Home/>),
    makeRoute("/login", <Login/>)
]);

function FBotRouter() {
    return <RouterProvider router={router}/>;
}

export default FBotRouter;
