import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Chat from "../pages/Chat";
import Story from "../pages/Story";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/chat/:id",
        element: <Chat />,
      },
      {
        path: "/story/:id",
        element: <Story />,
      },
    ],
  },
]);

const AllRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AllRoutes;
