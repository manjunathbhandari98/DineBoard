import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Loader, PasswordInput, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { getProfileInfo, loginUser } from "../../service/userService";
import { setProfile, setUserSession } from "../../slice/userSlice";
import Button from "../ui/Button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const credentials = { email, password };
      const response = await loginUser(credentials);

      // Example expected API response from backend:
      // { id, name, email, jwt }
      const token = response.jwt;

      // Save token to redux + localStorage
      dispatch(setUserSession({ token, profile: null }));

      // Fetch and store user profile
      const profile = await getProfileInfo();
      dispatch(setProfile(profile));

      notifications.show({
        title: "Login Successful",
        message: `Welcome back, ${profile?.name || "User"}!`,
        color: "green",
      });

      navigate("/dashboard");
    } catch (error: any) {
      notifications.show({
        title: "Login Failed",
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Oops! Something went wrong.",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {/* Email Input */}
      <TextInput
        label="Email"
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Password Input */}
      <PasswordInput
        id="password"
        label="Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
      />

      {/* Submit Button */}
      <Button type="submit" size="md" variant="filled" fullWidth>
        {isLoading ? <Loader size="sm" color="white" /> : "Login"}
      </Button>

      {/* Forgot Password */}
      <div className="text-center">
        <button
          type="button"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          onClick={() => navigate("/auth?mode=forgot-password")}
        >
          Forgot Password?
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
