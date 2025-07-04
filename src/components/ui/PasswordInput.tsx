import { Eye, EyeOff } from "lucide-react";
import React from "react"; // You can replace this with your icon library of choice

interface PasswordInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size"
  > {
  label?: string;
  description?: string;
  error?: string | boolean;
  radius?: "xs" | "sm" | "md" | "lg" | "xl";
  inputSize?: "sm" | "md" | "lg";
  withAsterisk?: boolean;
  leftSection?: React.ReactNode;
  mt?: string;
  isVisible?: boolean; // Add isVisible here
  toggleVisibility?: () => void; // Add toggleVisibility here
}

const PasswordInput: React.FC<
  PasswordInputProps
> = ({
  label,
  description,
  error,
  radius = "md",
  inputSize = "md",
  withAsterisk = false,
  leftSection,
  mt = "",
  disabled,
  required,
  className = "",
  isVisible = false, // Default value for isVisible
  toggleVisibility = () => {}, // Default function for toggleVisibility
  ...props
}) => {
  const baseRadius =
    {
      xs: "0.25rem",
      sm: "0.375rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
    }[radius] || "0.5rem";

  const baseSize =
    {
      sm: "1rem",
      md: "1.25rem",
      lg: "1.5rem",
    }[inputSize] || "1.25rem";

  const hasError =
    typeof error === "string" || error === true;

  return (
    <div className={`w-full ${mt}`}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
          {withAsterisk && (
            <span className="text-red-500 ml-0.5">
              *
            </span>
          )}
        </label>
      )}
      {description && (
        <div className="text-xs text-gray-500 mb-1">
          {description}
        </div>
      )}
      <div className="relative flex items-center">
        {leftSection && (
          <span className="absolute left-3 text-gray-500 pointer-events-none">
            {leftSection}
          </span>
        )}
        <input
          {...props}
          type={isVisible ? "text" : "password"}
          required={required}
          disabled={disabled}
          className={`w-full border outline-none transition duration-150 ${baseRadius} ${baseSize} 
            ${leftSection ? "pl-10" : ""} pr-10 
            ${
              hasError
                ? "border-red-500 text-red-700"
                : "border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            }
            ${
              disabled
                ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                : ""
            } ${className}`}
        />
        <button
          type="button"
          className="absolute right-3 text-gray-500 hover:text-gray-700 dark:hover:text-white"
          onClick={toggleVisibility}
          tabIndex={-1}
        >
          {isVisible ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>
      {hasError && typeof error === "string" && (
        <div className="text-xs text-red-600 mt-1">
          {error}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
