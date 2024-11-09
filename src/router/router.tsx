import { createBrowserRouter, Navigate } from "react-router-dom";

import NotFound from "../components/pages/NotFound";
import Login from "../components/pages/Login";
import AppLayout from "../components/pages/AppLayout";
import Homepage from "../components/pages/Homepage";
import Pricing from "../components/pages/Pricing";
import Product from "../components/pages/Pricing";
import Form from "../components/Form";
import CityList from "../components/CityList";
import CountryList from "../components/CountryList";
import City from "../components/City";
import ProtectedRoute from "../components/pages/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="cities" replace />,
      },
      {
        path: "cities",
        element: <CityList />,
      },
      {
        path: "cities/:id",
        element: <City />,
      },
      {
        path: "countries",
        element: <CountryList />,
      },
      {
        path: "form",
        element: <Form />,
      },
    ],
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
