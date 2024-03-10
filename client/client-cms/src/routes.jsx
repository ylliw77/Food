import { createBrowserRouter, redirect } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import Homepage from "./pages/Homepage";
import AddStaff from "./pages/AddStaff";
import UploadImage from "./pages/UploadImage";
import CategoryPage from "./pages/Categories";
import Dashboard from "./pages/Dashboard";
import Form from "./components/formAddOrEdit";

const authHome = () => {
  if (!localStorage.getItem("access_token")) {
   return redirect("/login");
  }
  return null;
};

const authLogin = () => {
  if (localStorage.getItem("access_token")) {
    return redirect("/dash");
  }
  return null;
};

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
    loader: authLogin,
  },
  {
    path: "/",
    element: <Homepage />,
    loader: authHome,
    children: [
      {
        path: "/dash",
        element: <Dashboard />,
      },
      {
        path: "/add-staff",
        element: <AddStaff />,
        loader: authHome,
      },
      {
        path: "/category",
        element: <CategoryPage />,
        loader: authHome,
      },
      {
        path: "/add-cuisine",
        element: <Form page={"add"} />,
        loader: authHome,
      },
      {
        path: "/edit/:id",
        element: <Form page={"edit"}/>,
        loader: authHome,
      },
      {
        path: "/upload/:id",
        element: <UploadImage />,
        loader: authHome,
      },
    ],
  },
]);

export default routes;
