import React, {
  forwardRef,
  useState,
  useEffect,
} from "react";

interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  rightSection?: React.ReactNode;
  type?:
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "search";
}

const TextInput = forwardRef<
  HTMLInputElement,
  TextInputProps
>(
  (
    {
      label,
      placeholder,
      value,
      onChange,
      error,
      success,
      disabled,
      icon,
      rightSection,
      size = "md",
      type = "text",
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] =
      useState<string>(value || "");

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setInputValue(e.target.value);
      if (onChange) onChange(e);
    };

    useEffect(() => {
      if (value !== undefined) {
        setInputValue(value);
      }
    }, [value]);

    const getSizeClass = () => {
      switch (size) {
        case "sm":
          return "py-2 px-3 text-sm";
        case "lg":
          return "py-3 px-4 text-lg";
        default:
          return "py-2.5 px-4 text-base";
      }
    };

    const inputClassNames = [
      "transition-all duration-200 border rounded-md focus:outline-none w-full", // w-full added here
      error
        ? "border-red-500"
        : success
        ? "border-green-500"
        : "border-gray-300",
      disabled
        ? "bg-gray-200 cursor-not-allowed"
        : "bg-white",
      getSizeClass(),
    ].join(" ");

    return (
      <div className="relative w-full">
        {" "}
        {/* Ensure full width for container */}
        {label && (
          <label className="block text-sm font-medium mb-1">
            {label}
          </label>
        )}
        <div className="flex items-center space-x-2">
          {icon && (
            <div className="text-gray-500">
              {icon}
            </div>
          )}
          <input
            {...props}
            type={type}
            value={inputValue}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder}
            className={inputClassNames}
            ref={ref}
          />
          {rightSection && (
            <div className="text-gray-500">
              {rightSection}
            </div>
          )}
        </div>
        {error && (
          <div className="text-red-500 text-sm mt-1">
            {error}
          </div>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
