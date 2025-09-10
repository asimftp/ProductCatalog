import type { RouteObject } from "react-router-dom";
import { Home } from "../Pages/Home";
import { AddProduct } from "../Pages/AddProduct";
import { EditProduct } from "../Pages/EditProduct";

export const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/AddProduct", element: <AddProduct /> },
  { path: "/EditProduct/:id", element: <EditProduct /> },
];