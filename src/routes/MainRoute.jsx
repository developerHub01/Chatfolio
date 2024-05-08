import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import { lazy, Suspense } from "react";
import LayoutLoader from "../components/loaders/LayoutLoader";

const Home = lazy(() => import("../pages/Home"));
// const Chat = lazy(() => import("../pages/Chat"));
const Story = lazy(() => import("../pages/Story"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LayoutLoader />}>
        <App />
      </Suspense>
    ),
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
