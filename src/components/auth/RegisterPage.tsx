import { useState } from "react";
import { Button, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const navigate = useNavigate(); // Use this for navigation after registration

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    // Add your registration logic here, e.g., API call for registration
    console.log("Registering with:", {
      fullName,
      email,
      password,
    });

    // If registration successful, redirect user
    navigate("/dashboard"); // Redirect to the dashboard (or any other page)
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="mb-4">
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) =>
            setfullName(e.target.value)
          }
          required
        />
      </div>
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
      <div className="mb-4">
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
      <div className="mb-6">
        <TextInput
          label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          required
        />
      </div>
      <Button
        type="submit"
        fullWidth
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterPage;
