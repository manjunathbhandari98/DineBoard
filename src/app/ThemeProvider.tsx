/* eslint-disable react-refresh/only-export-components */
// ThemeProvider.tsx
import {
  createTheme,
  MantineProvider,
  ColorSchemeScript,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import {
  useState,
  createContext,
  useContext,
} from "react";

// Define the context type
type ThemeContextType = {
  colorScheme: "light" | "dark";
  toggleColorScheme: (
    value?: "light" | "dark"
  ) => void;
};

// Create the context
const ThemeContext = createContext<
  ThemeContextType | undefined
>(undefined);

// Export a hook to use the context
export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error(
      "useThemeContext must be used within ThemeProvider"
    );
  return ctx;
};

const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [colorScheme, setColorScheme] = useState<
    "light" | "dark"
  >("light");

  const toggleColorScheme = (
    value?: "light" | "dark"
  ) =>
    setColorScheme(
      value ||
        (colorScheme === "light"
          ? "dark"
          : "light")
    );

  const customTheme = createTheme({
    primaryColor: "redTheme",
    primaryShade: 5,
    colors: {
      redTheme: [
        "#fff1f2",
        "#ffe4e6",
        "#fecdd3",
        "#fda4af",
        "#fb7185",
        "#f43f5e",
        "#e11d48",
        "#be123c",
        "#9f1239",
        "#881337",
      ],
    },
    fontFamily: "Poppins, sans-serif",
    defaultRadius: "md",
    white: "#ffffff",
    black: "#1f1f1f",
    headings: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: "600",
    },
  });

  return (
    <ThemeContext.Provider
      value={{ colorScheme, toggleColorScheme }}
    >
      <ColorSchemeScript defaultColorScheme="light" />
      <MantineProvider
        theme={customTheme}
        forceColorScheme={colorScheme}
      >
        <Notifications />
        {children}
      </MantineProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
