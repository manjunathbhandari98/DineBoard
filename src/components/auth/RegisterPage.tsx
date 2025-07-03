import { TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../service/userService";
import Button from "../ui/Button";

const RegisterPage = () => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [isLoading, setIsLoading] =
    useState(false);
  const navigate = useNavigate(); // Use this for navigation after registration

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    setIsLoading(true);
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    const userData = {
      name: fullName,
      email: email,
      password: password,
      accountType: "USER",
    };
    try {
      await registerUser(userData);
      setIsLoading(false);
      // --- Notification ---
      notifications.show({
        title: "Registered Successfully",
        message:
          "Your account has been registered ",
        color: "green",
      });
      navigate("/auth?mode=login");
    } catch (error: any) {
      setIsLoading(false);
      // --- Notification ---
      notifications.show({
        title: "Failed To Register",
        message: error.message,
        color: "red",
      });
    }
    // If registration successful, redirect user
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
        {isLoading ? 'Registering...': 'Register'}
      </Button>
    </form>
  );
};

export default RegisterPage;
