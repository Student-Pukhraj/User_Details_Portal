import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserDetailsEdit from "./features/register/UserDetailsEdit";
import UserData from "./features/register/UserData";
import LoginForm from "./features/register/LoginForm";
import Layout from "./features/register/Layout";
import { Register } from "./features";
import Data from "../src/features/register/Data";

const router = createBrowserRouter([
  {
    path: "/:id?",
    element: <Layout />,
    children: [
      { index: true, element: <Register /> },
      { path: "login", element: <LoginForm /> },
      { path: "data", element: <Data /> },
      { path: "user-data", element: <UserData /> },
      { path: "user-details-edit/:id", element: <UserDetailsEdit /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
