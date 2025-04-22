import React from "react";
import clsx from "clsx";

type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Weight =
  | "thin"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold";
type Align =
  | "left"
  | "center"
  | "right"
  | "justify";
type Color =
  | "black"
  | "white"
  | "gray"
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "indigo"
  | "purple"
  | "pink";

interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  size?: Size;
  weight?: Weight;
  color?: Color;
  align?: Align;
  italic?: boolean;
  underline?: boolean;
  lineClamp?: number;
  truncate?: boolean;
  mt?: string;
  mb?: string;
}

const sizeMap: Record<Size, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const weightMap: Record<Weight, string> = {
  thin: "font-thin",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

const colorMap: Record<Color, string> = {
  black: "text-black",
  white: "text-white",
  gray: "text-gray-600",
  red: "text-red-600",
  blue: "text-blue-600",
  green: "text-green-600",
  yellow: "text-yellow-600",
  indigo: "text-indigo-600",
  purple: "text-purple-600",
  pink: "text-pink-600",
};

const alignMap: Record<Align, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const Text: React.FC<TextProps> = ({
  children,
  size = "md",
  weight = "normal",
  color = "gray",
  align = "left",
  italic = false,
  underline = false,
  lineClamp,
  truncate = false,
  mt = "",
  mb = "",
  className = "",
  ...props
}) => {
  return (
    <p
      {...props}
      className={clsx(
        sizeMap[size],
        weightMap[weight],
        colorMap[color],
        alignMap[align],
        italic && "italic",
        underline && "underline",
        lineClamp && `line-clamp-${lineClamp}`,
        truncate && "truncate",
        mt,
        mb,
        className
      )}
    >
      {children}
    </p>
  );
};

export default Text;
