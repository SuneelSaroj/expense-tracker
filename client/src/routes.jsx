import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./components/pages/Login.jsx";
import RegisterPage from "./components/pages/RegisterPage.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Error from "./components/pages/Error.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <Error />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        errorElement: <Error />,
      },
      {
        path: "/",
        element: <Dashboard />,
        errorElement: <Error />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

export default router;
