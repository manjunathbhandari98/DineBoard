import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../service/localStorageService";

export const AuthChecker = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define public routes where auth check should be skipped
  const publicRoutes = [
    "/auth",
    "/customer-menu",
    "/",
    "/menu/",
    "/pricing",
    "/support",
    "/about",
    "/features",
  ];

  const isPublicRoute = publicRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  useEffect(() => {
    if (isPublicRoute) return; // Skip auth check for public routes

    const token = getToken("authToken");

    // If no token found → redirect
    if (!token) {
      removeToken("authToken");
      navigate("/auth?mode=login");
      return;
    }

    try {
      // Validate token format
      const parts = token.split(".");
      if (parts.length !== 3) {
        console.warn("Invalid JWT format");
        removeToken("authToken");
        navigate("/auth?mode=login");
        return;
      }

      // Decode safely
      const payloadBase64 = parts[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));

      // Check expiry (exp is in seconds)
      const expiry = decodedPayload.exp * 1000;
      const now = Date.now();

      if (now > expiry) {
        console.warn("JWT expired, logging out...");
        removeToken("authToken");
        navigate("/auth?mode=login");
        return;
      }

      // Auto logout when it expires
      const timeout = expiry - now;
      const timer = setTimeout(() => {
        removeToken("authToken");
        navigate("/auth?mode=login");
      }, timeout);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      removeToken("authToken");
      navigate("/auth?mode=login");
    }
  }, [isPublicRoute, location.pathname, navigate]);

  return null;
};
