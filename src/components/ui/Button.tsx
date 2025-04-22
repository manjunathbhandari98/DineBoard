import React from "react";
import clsx from "clsx";

type Variant =
  | "filled"
  | "outline"
  | "light"
  | "subtle";
type Color =
  | "blue"
  | "red"
  | "green"
  | "gray"
  | "black"
  | "teal";
type Radius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "full";
type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: Color;
  variant?: Variant;
  radius?: Radius;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  mt?: string;
}

const radiusMap: Record<Radius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const sizeMap: Record<Size, string> = {
  xs: "text-xs px-2 py-1",
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-2.5",
  xl: "text-xl px-6 py-3",
};

const variantClassMap: Record<
  Color,
  Record<Variant, string>
> = {
  red: {
    filled:
      "bg-[#f43f5e] text-white hover:bg-[#e11d48]",
    outline:
      "border border-red-600 text-red-600 hover:bg-red-50",
    light:
      "bg-red-100 text-red-600 hover:bg-red-200",
    subtle: "text-red-600 hover:bg-red-100",
  },
  green: {
    filled:
      "bg-green-600 text-white hover:bg-green-700",
    outline:
      "border border-green-600 text-green-600 hover:bg-green-50",
    light:
      "bg-green-100 text-green-600 hover:bg-green-200",
    subtle: "text-green-600 hover:bg-green-100",
  },
  blue: {
    filled:
      "bg-blue-600 text-white hover:bg-blue-700",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50",
    light:
      "bg-blue-100 text-blue-600 hover:bg-blue-200",
    subtle: "text-blue-600 hover:bg-blue-100",
  },
  gray: {
    filled:
      "bg-gray-600 text-white hover:bg-gray-700",
    outline:
      "border border-gray-600 text-gray-600 hover:bg-gray-50",
    light:
      "bg-gray-100 text-gray-600 hover:bg-gray-200",
    subtle: "text-gray-600 hover:bg-gray-100",
  },
  black: {
    filled:
      "bg-black text-white hover:bg-gray-800",
    outline:
      "border border-black text-black hover:bg-gray-100",
    light:
      "bg-gray-200 text-black hover:bg-gray-300",
    subtle: "text-black hover:bg-gray-200",
  },
  teal: {
    filled:
      "bg-teal-500 text-white hover:bg-teal-600",
    outline:
      "border border-teal-500 text-teal-500 hover:bg-teal-50",
    light:
      "bg-teal-100 text-teal-500 hover:bg-teal-200",
    subtle: "text-teal-500 hover:bg-teal-100",
  },
};

const Button: React.FC<ButtonProps> = ({
  children,
  color = "red",
  variant = "filled",
  radius = "md",
  size = "md",
  fullWidth = false,
  loading = false,
  leftSection,
  rightSection,
  className = "",
  mt = "",
  ...props
}) => {
  const finalClass = clsx(
    "inline-flex items-center cursor-pointer px-2 justify-center gap-2 font-medium transition-all duration-200",
    sizeMap[size],
    radiusMap[radius],
    variantClassMap[color][variant],
    fullWidth && "w-full",
    mt,
    (loading || props.disabled) &&
      "opacity-50 cursor-not-allowed",
    className
  );

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={finalClass}
    >
      {leftSection && (
        <span className="mr-1">
          {leftSection}
        </span>
      )}
      {loading ? "Loading..." : children}
      {rightSection && (
        <span className="ml-1">
          {rightSection}
        </span>
      )}
    </button>
  );
};

export default Button;
