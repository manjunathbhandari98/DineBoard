import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import RoutePaths from "./routePaths";
import { getToken } from "../service/localStorageService";

const PublicRoutes = () => {
  const user = getToken("authToken");
  const location = useLocation();
  const params = new URLSearchParams(
    location.search
  );
  const mode = params.get("mode");

  if (
    user &&
    location.pathname === RoutePaths.AUTH &&
    (mode === "login" || mode === "register")
  ) {
    return (
      <Navigate
        to={RoutePaths.HOME}
        replace
      />
    );
  }

  return <Outlet />;
};

export default PublicRoutes;
