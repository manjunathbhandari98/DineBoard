import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  getProfileInfo,
  loginUser,
} from "../../service/userService"; // Keep your service import
import {
  setProfile,
  setUser,
} from "../../slice/userSlice"; // Keep your Redux slice import

import Button from "../ui/Button";
import {
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { parseJwt } from "../../service/auth";
import { setToken } from "../../service/localStorageService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [
    isPasswordVisible,
    setIsPasswordVisible,
  ] = useState(false); // Replaces useDisclosure
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    // Consider adding basic client-side validation here if needed

    try {
      const userData = {
        email: email,
        password: password,
      };
      const response = await loginUser(userData);

      const token = response;
      dispatch(setUser(token));
      const profile = await getProfileInfo();
      dispatch(setProfile(profile));

      // --- Notification ---

      notifications.show({
        title: "Login Successful",
        message: "Welcome Back",
        color: "green",
      });

      navigate("/dashboard"); // Redirect to the dashboard
    } catch (error: any) {
      notifications.show({
        title: "Login Failed",
        // Try to display a more specific error message if available
        message:
          error?.response?.data?.message ||
          "Oops! Login Failed",
        color: "red",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="space-y-6"
      >
        {" "}
        {/* Add spacing between elements */}
        {/* Email Input */}
        <TextInput
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />
        {/* Password Input */}
        <PasswordInput
          id="password"
          label="Password"
          name="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          visible={isPasswordVisible}
          onVisibilityChange={
            togglePasswordVisibility
          }
          placeholder="Enter your password"
          required
        />
        {/* Submit Button */}
        <div>
          {" "}
          {/* Optional div wrapper for spacing/layout */}
          <Button
            type="submit"
            size="md"
            variant="filled"
            fullWidth
          >
            Login
          </Button>
        </div>
        {/* Forgot Password Link */}
        <div className="text-center">
          {" "}
          {/* Removed mt-4 as form now has space-y-6 */}
          <button
            type="button" // Important: type="button" to prevent form submission
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer focus:outline-none"
            onClick={() =>
              navigate(
                "/auth?mode=forgot-password"
              )
            } // Navigate to forgot-password page
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
