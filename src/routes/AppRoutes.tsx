// src/routes/AppRoutes.tsx
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "@mantine/core";
import RoutePaths from "./routePaths";
import HotelMenuPreview from "../components/customer/HotelMenuPreview";
import HotelSettings from "../components/HotelSettings";
import HotelProfile from "../pages/HotelProfile";
import SettingsPage from "../pages/Settings";
import useMenuRouteBlocker from "../hooks/useMenuRouteBlocker";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

// Lazy-loaded pages
const HomePage = lazy(
  () => import("../pages/Home")
);
const PricingPage = lazy(
  () => import("../pages/Pricing")
);
const SupportPage = lazy(
  () => import("../pages/ContactPage")
);
const AboutPage = lazy(
  () => import("../pages/About")
);
const QRCodes = lazy(
  () => import("../pages/QRCodes")
);
const AuthPage = lazy(
  () => import("../pages/AuthPage")
);
const ManageOrders = lazy(
  () => import("../pages/ManageOrders")
);
const Dashboard = lazy(
  () => import("../pages/DashBoard")
);
const HotelMenu = lazy(
  () => import("../pages/HotelMenu")
);

const AppRoutes = () => {
  useMenuRouteBlocker();

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader
            size="lg"
            variant="dots"
          />
        </div>
      }
    >
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route
            path={RoutePaths.HOME}
            element={<HomePage />}
          />
          <Route
            path={RoutePaths.PRICING}
            element={<PricingPage />}
          />
          <Route
            path={RoutePaths.SUPPORT}
            element={<SupportPage />}
          />
          <Route
            path={RoutePaths.ABOUT}
            element={<AboutPage />}
          />
          <Route
            path={RoutePaths.AUTH}
            element={<AuthPage />}
          />

          {/* <Route
            path={RoutePaths.LOGIN}
            element={<AuthPage />}
          />
          <Route
            path={RoutePaths.REGISTER}
            element={<AuthPage />}
          /> */}
          {/* Menu Preview (static + dynamic) */}
          <Route
            path={RoutePaths.PREVIEWMENU}
            element={<HotelMenuPreview />}
          />
          <Route
            path={`${RoutePaths.PREVIEWMENU}/:id`}
            element={<HotelMenuPreview />}
          />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route
            path={RoutePaths.DASHBOARD}
            element={<Dashboard />}
          />
          <Route
            path={RoutePaths.MENUS}
            element={<HotelMenu />}
          />
          <Route
            path={RoutePaths.QRCODES}
            element={<QRCodes />}
          />
          <Route
            path={RoutePaths.ORDERS}
            element={<ManageOrders />}
          />
          <Route
            path={RoutePaths.HOTELSETTINGS}
            element={<HotelSettings />}
          />
          <Route
            path={RoutePaths.HOTELPROFILE}
            element={<HotelProfile />}
          />
          <Route
            path={RoutePaths.SETTINGS}
            element={<SettingsPage />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
