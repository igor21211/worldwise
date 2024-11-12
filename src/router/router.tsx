import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import SpinnerFullPage from "../components/SpinnerFullPage";

/* dist/assets/index-Dyo7cZJU.css   37.30 kB │ gzip:   6.64 kB
dist/assets/index-CdM1aCSk.js   548.53 kB │ gzip: 162.09 kB */

const Homepage = lazy(() => import("../components/pages/Homepage"));
const Pricing = lazy(() => import("../components/pages/Pricing"));
const Product = lazy(() => import("../components/pages/Product"));
const Form = lazy(() => import("../components/Form"));
const CityList = lazy(() => import("../components/CityList"));
const CountryList = lazy(() => import("../components/CountryList"));
const City = lazy(() => import("../components/City"));
const ProtectedRoute = lazy(() => import("../components/pages/ProtectedRoute"));
const NotFound = lazy(() => import("../components/pages/NotFound"));
const Login = lazy(() => import("../components/pages/Login"));
const AppLayout = lazy(() => import("../components/pages/AppLayout"));

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<SpinnerFullPage />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<SpinnerFullPage />}>
        <Homepage />
      </Suspense>
    ),
  },
  {
    path: "/app",
    element: (
      <Suspense fallback={<SpinnerFullPage />}>
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="cities" replace />,
      },
      {
        path: "cities",
        element: (
          <Suspense fallback={<SpinnerFullPage />}>
            <CityList />
          </Suspense>
        ),
      },
      {
        path: "cities/:id",
        element: (
          <Suspense fallback={<SpinnerFullPage />}>
            <City />
          </Suspense>
        ),
      },
      {
        path: "countries",
        element: (
          <Suspense fallback={<SpinnerFullPage />}>
            <CountryList />
          </Suspense>
        ),
      },
      {
        path: "form",
        element: (
          <Suspense fallback={<SpinnerFullPage />}>
            <Form />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/pricing",
    element: (
      <Suspense fallback={<SpinnerFullPage />}>
        <Pricing />
      </Suspense>
    ),
  },
  {
    path: "/product",
    element: (
      <Suspense fallback={<SpinnerFullPage />}>
        <Product />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<SpinnerFullPage />}>
        <NotFound />
      </Suspense>
    ),
  },
]);
