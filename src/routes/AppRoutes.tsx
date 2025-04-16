import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import RoutePaths from "./routePaths";
import HotelMenuPreview from "../components/customer/HotelMenuPreview";
import HotelSettings from "../components/HotelSettings";
import HotelProfile from "../pages/HotelProfile";
import SettingsPage from "../pages/Settings";

// Lazy loading of pages
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
  return (
    <Routes>
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
        path={RoutePaths.LOGIN}
        element={<AuthPage />}
      />
      <Route
        path={RoutePaths.REGISTER}
        element={<AuthPage />}
      />

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
        path={RoutePaths.CUSTOMERMENU}
        element={<HotelMenuPreview />}
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
    </Routes>
  );
};

export default AppRoutes;
