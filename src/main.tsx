import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx";
import CityProvider from "./context/CityContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <CityProvider>
        <RouterProvider router={router} />
      </CityProvider>
    </AuthProvider>
  </StrictMode>
);
