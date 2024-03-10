import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import DetailedMenu from "./pages/DetailMenu";

const routes = createBrowserRouter([
    {
        path : "/",
        element : <Homepage component="card"/>,
    },
    {
        path : "detail/:id",
        element : <DetailedMenu/>
    },
])
    
export default routes