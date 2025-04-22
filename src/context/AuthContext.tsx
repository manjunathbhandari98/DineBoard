import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getToken,
  removeToken,
} from "../service/localStorageService";

export const AuthChecker = () => {
  const navigate = useNavigate();

  useEffect(() => {
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

      setTimeout(() => {
        removeToken("authToken");
        navigate("/auth?mode=login");
      }, timeout);
    }
  }, []);

  return null;
};
