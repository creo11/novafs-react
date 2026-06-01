import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import ServicesPage from "../pages/ServicesPage";
import { ROUTE_HEROES } from "./heroConfig";

const basename =
  import.meta.env.BASE_URL === "/"
    ? undefined
    : import.meta.env.BASE_URL.replace(/\/$/, "");

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        handle: { hero: ROUTE_HEROES.home },
      },
      {
        path: "about",
        element: <AboutPage />,
        handle: { hero: ROUTE_HEROES.about },
      },
      {
        path: "services",
        element: <ServicesPage />,
        handle: { hero: ROUTE_HEROES.services },
      },
      {
        path: "contact",
        element: <ContactPage />,
        handle: { hero: ROUTE_HEROES.contact },
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
], { basename });

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
