import { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import LoginPage from "../components/auth/LoginPage";
import RegisterPage from "../components/auth/RegisterPage";

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const mode = new URLSearchParams(
      location.search
    ).get("mode");
    setIsLogin(mode !== "register"); // Defaults to login
  }, [location.search]);

  const handleToggle = () => {
    const newMode = isLogin
      ? "register"
      : "login";
    navigate(`/auth?mode=${newMode}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">
          {isLogin ? "Login" : "Registration"}
        </h2>

        {isLogin ? (
          <LoginPage />
        ) : (
          <RegisterPage />
        )}

        <div className="flex justify-center mt-4">
          <button
            className="text-blue-500"
            onClick={handleToggle}
          >
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <span className="cursor-pointer">
                  Register
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span className="cursor-pointer">
                  Login
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
