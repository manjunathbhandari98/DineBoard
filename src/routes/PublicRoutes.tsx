import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import RoutePaths from "./routePaths";

const PublicRoutes = () => {
  const location = useLocation();

   {
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
