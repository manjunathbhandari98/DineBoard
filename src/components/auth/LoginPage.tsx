import { useState } from "react";
import { Button, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Use this for navigation after login

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here, e.g., API call for login
    notifications.show({
      title:'Login Successfull',
      message:'Welcome back!',
      color:'green'
    })

    // If login successful, redirect user
    navigate("/dashboard"); // Redirect to the dashboard (or any other page)
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <TextInput
          label="Email Address"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />
      </div>
      <div className="mb-6">
        <TextInput
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />
      </div>
      <Button
        type="submit"
        fullWidth
        onClick={handleLogin}
      >
        Login
      </Button>

      {/* Forgot Password Link */}
      <div className="mt-4 text-center">
        <button  
          className="text-blue-500 cursor-pointer"
          onClick={() =>
            navigate("/auth?mode=forgot-password")
          } // Navigate to forgot-password page
        >
          Forgot Password?
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
