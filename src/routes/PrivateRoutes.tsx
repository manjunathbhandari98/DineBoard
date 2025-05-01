import {
  Navigate,
  Outlet,
} from "react-router-dom";
import RoutePaths from "./routePaths";
import { getToken } from "../service/localStorageService";

const PrivateRoutes = () => {
  const user = getToken("authToken"); // Ensure user state is correctly set

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={RoutePaths.LOGIN} />
  );
};

export default PrivateRoutes;
