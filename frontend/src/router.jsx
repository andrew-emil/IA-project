import { createBrowserRouter } from "react-router-dom";
import Login from "./views/login";
import Register from "./views/register";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Home from "./views/home";
import ForgoPassword from "./views/forgot_password";
import ResetPassword from "./views/reset_password";
import NotFoundPage from "./views/not_found";
import MyAccount from "./views/myAccount";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/account", element: <MyAccount /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgoPassword /> },
      { path: "/reset-password", element: <ResetPassword /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
