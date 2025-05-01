import { useEffect } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  getToken,
  removeToken,
} from "../service/localStorageService";

export const AuthChecker = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define public routes where auth check should be skipped
  const publicRoutes = [
    "/auth",
    "/customer-menu",
    "/",
    "/menu/:id",
    "/menu",
    "/pricing",
    "/support",
    "/about",
    "/features",
  ];

  const isPublicRoute = publicRoutes.some(
    (route) => location.pathname.startsWith(route)
  );

  useEffect(() => {
    if (isPublicRoute) return; // Skip auth check for public routes

    const token = getToken("authToken");
    if (!token) {
      removeToken("authToken");
      navigate("/auth?mode=login");
    } else {
      const payloadBase64 = token.split(".")[1];
      const decoded = JSON.parse(
        atob(payloadBase64)
      );
      const timeout =
        decoded.exp * 1000 - Date.now();

      // Auto-logout when token expires
      const timer = setTimeout(() => {
        removeToken("authToken");
        navigate("/auth?mode=login");
      }, timeout);

      return () => clearTimeout(timer); // Clear timer on unmount
    }
  }, [
    isPublicRoute,
    location.pathname,
    navigate,
  ]);

  return null;
};
