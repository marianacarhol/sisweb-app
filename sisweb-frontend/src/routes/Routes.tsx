import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductPage from "../pages/ProductPage";
import ErrorPage from "../pages/ErrorPage";
import AddPage from "../pages/AddPage";

const router = createBrowserRouter([
    {
        path: "/", 
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <ProductPage />,
                errorElement: <ErrorPage />,
              },
            {
                path: "products",
                element: <ProductPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "addProduct",
                element: <AddPage />,
                errorElement: <ErrorPage />
            }
        ],
    },
]);

export default router;